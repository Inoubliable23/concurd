import { takeEvery, takeLatest, call, all, put, select } from 'redux-saga/effects';
import history from '../../history';
import { uploadPlaylistImage, addDocument, addCollectionAndDocuments, updateDocument, getCollectionMap, updateVideoLikes, addVideoToPlaylist, removeVideoFromPlaylist } from '../../firebase/firebase.utils';
import { ADD_VIDEO_TO_CURRENT_PLAYLIST, ADD_VIDEO, TOGGLE_LIKE_WITH_CURRENT_USER, TOGGLE_LIKE, FETCH_TOP_PLAYLISTS, FETCH_TOP_PLAYLISTS_SUCCESS, CREATE_PLAYLIST, CREATE_PLAYLIST_SUCCESS, PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, PLAYLIST_DRAFT_ADD_VIDEO, EDIT_PLAYLIST, EDIT_PLAYLIST_SUCCESS, CREATE_DRAFT, EDITING_START, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST } from './playlist.types';
import { selectCurrentUserId } from '../user/user.selectors';
import { selectPlaylistById, selectPlaylistDraftVideos, selectCurrentPlaylistId } from './playlist.selectors';

function* onAddVideo() {
	yield takeEvery(ADD_VIDEO_TO_CURRENT_PLAYLIST, addVideoToCurrentPlaylist);
}

function* onAddVideoDB() {
	yield takeEvery(ADD_VIDEO, addVideoDB);
}

function* onRemoveVideo() {
	yield takeEvery(REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, removeVideoDB);
}

function* onToggleLike() {
	yield takeEvery(TOGGLE_LIKE_WITH_CURRENT_USER, toggleLike);
}

function* onToggleLikeDB() {
	yield takeEvery(TOGGLE_LIKE, toggleLikeDB);
}

function* onCreatePlaylist() {
	yield takeEvery(CREATE_PLAYLIST, createPlaylistAsync);
}

function* onStartEditing() {
	yield takeEvery(EDITING_START, editingStart);
}

function* onEditPlaylist() {
	yield takeEvery(EDIT_PLAYLIST, editPlaylistAsync);
}

function* onPlaylistDraftVideoAdd() {
	yield takeEvery(PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, playlistDraftVideoAddWithCurrentUser);
}

function* addVideoToCurrentPlaylist({ payload: { video } }) {
	const currentPlaylistId = yield select(selectCurrentPlaylistId);
	const currentUserId = yield select(selectCurrentUserId);

	yield put({
		type: ADD_VIDEO,
		payload: {
			playlistId: currentPlaylistId,
			video,
			userId: currentUserId
		}
	});
}

function* addVideoDB({ payload: { playlistId, video, userId } }) {
	const videoObject = {
		...video,
		addedBy: userId
	};
	yield addVideoToPlaylist(playlistId, videoObject, userId);
}

function* removeVideoDB({ payload: { videoId } }) {
	const currentPlaylistId = yield select(selectCurrentPlaylistId);
	yield removeVideoFromPlaylist(currentPlaylistId, videoId);
}

function* toggleLike({ payload }) {
	const currentUserId = yield select(selectCurrentUserId);
	const currentPlaylistId = yield select(selectCurrentPlaylistId);

	yield put({
		type: TOGGLE_LIKE,
		payload: {
			...payload,
			playlistId: currentPlaylistId,
			userId: currentUserId
		}
	});
}

function* toggleLikeDB({ payload: { playlistId, videoId, userId, like } }) {
	yield updateVideoLikes(playlistId, videoId, userId, like);
}

function* onFetchPlaylistsStart() {
	yield takeLatest(FETCH_TOP_PLAYLISTS, fetchPlaylistsAsync);
};

const fetchPlaylistsSuccess = playlistsMap => ({
	type: FETCH_TOP_PLAYLISTS_SUCCESS,
	payload: {
		playlists: playlistsMap
	}
});

function* fetchPlaylistsAsync() {
	try {
		const playlistsMap = yield getCollectionMap('playlists');
		yield put(fetchPlaylistsSuccess(playlistsMap));
	} catch (error) {
		console.log(error);
	}
};

const createPlaylistSuccess = payload => ({
	type: CREATE_PLAYLIST_SUCCESS,
	payload
});

function* createPlaylistAsync({ payload: { name, description, image } }) {
	try {
		let imageUrl = null;
		if (image) {
			imageUrl = yield uploadPlaylistImage(image);
		}

		const currentUserId = yield select(selectCurrentUserId);
		const playlistVideos = yield select(selectPlaylistDraftVideos);
		const videosStaticData = {};
		const videosPlaylistData = {
			byId: {},
			orderedIds: playlistVideos.map(video => video.id)
		};
		playlistVideos.forEach(video => {
			videosStaticData[video.id] = {
				id: video.id,
				title: video.title,
				thumbnailUrl: video.thumbnailUrl,
				channelName: video.channelName
			};
			videosPlaylistData.byId[video.id] = {
				id: video.id,
				addedBy: video.addedBy,
				likedBy: video.likedBy
			};
		});
		const newPlaylist = {
			name,
			description,
			author: currentUserId,
			imageUrl,
			videos: videosPlaylistData
		};
		
		const docRef = yield addDocument('playlists', newPlaylist);
		yield addCollectionAndDocuments('videos', videosStaticData);

		yield put(createPlaylistSuccess({
			playlist: {
				...newPlaylist,
				id: docRef.id
			},
			videos: videosStaticData
		}));
		history.push(`/edit/${docRef.id}`);
	} catch (error) {
		console.log(error);
	}
};

const editPlaylistSuccess = payload => ({
	type: EDIT_PLAYLIST_SUCCESS,
	payload
});

function* editPlaylistAsync({ payload: { id, name, description, image } }) {
	try {
		let imageUrl = null;
		if (image) {
			imageUrl = yield uploadPlaylistImage(image);
		}

		const currentUserId = yield select(selectCurrentUserId);
		const playlistVideos = yield select(selectPlaylistDraftVideos);
		const videosStaticData = {};
		const videosPlaylistData = {
			byId: {},
			orderedIds: playlistVideos.map(video => video.id)
		};
		playlistVideos.forEach(video => {
			videosStaticData[video.id] = {
				id: video.id,
				title: video.title,
				thumbnailUrl: video.thumbnailUrl,
				channelName: video.channelName
			};
			videosPlaylistData.byId[video.id] = {
				id: video.id,
				addedBy: video.addedBy,
				likedBy: video.likedBy
			};
		});
		const editedPlaylist = {
			id,
			name,
			description,
			author: currentUserId,
			imageUrl,
			videos: videosPlaylistData
		};
		
		yield updateDocument('playlists', editedPlaylist);
		yield addCollectionAndDocuments('videos', videosStaticData);

		yield put(editPlaylistSuccess({
			playlist: {
				...editedPlaylist
			},
			videos: videosStaticData
		}));
	} catch (error) {
		console.log(error);
	}
};

const playlistDraftVideoAdd = payload => ({
	type: PLAYLIST_DRAFT_ADD_VIDEO,
	payload
});

function* playlistDraftVideoAddWithCurrentUser({ payload: { video } }) {
	const currentUserId = yield select(selectCurrentUserId);
	yield put(playlistDraftVideoAdd({
		video: {
			...video,
			addedBy: currentUserId
		}
	}));
}

const createDraft = payload => ({
	type: CREATE_DRAFT,
	payload
});

function* editingStart({ payload: { playlistId } }) {
	const playlist = yield select(selectPlaylistById, playlistId);
	yield put(createDraft({
		playlist
	}));
}

export function* playlistSagas() {
	yield all([
		call(onFetchPlaylistsStart),
		call(onAddVideo),
		call(onAddVideoDB),
		call(onRemoveVideo),
		call(onCreatePlaylist),
		call(onStartEditing),
		call(onEditPlaylist),
		call(onPlaylistDraftVideoAdd),
		call(onToggleLike),
		call(onToggleLikeDB)
	]);
}