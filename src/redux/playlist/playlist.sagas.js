import { takeEvery, takeLatest, call, all, put, select } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';
import history from '../../history';
import { uploadPlaylistImage, addDocument, addCollectionAndDocuments, updateDocument, getCollectionMap, updateVideoLikes, addVideoToPlaylist, removeVideoFromPlaylist, getPlaylist, addCommentToPlaylist, getMyPlaylists } from '../../firebase/firebase.utils';
import { ADD_VIDEO_TO_CURRENT_PLAYLIST, ADD_VIDEO, TOGGLE_LIKE_WITH_CURRENT_USER, TOGGLE_LIKE, FETCH_TOP_PLAYLISTS, CREATE_PLAYLIST, PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, FETCH_PLAYLIST, ADD_COMMENT_TO_CURRENT_PLAYLIST, ADD_COMMENT, FETCH_MY_PLAYLISTS, SAVE_PLAYLIST_EDIT } from './playlist.types';
import { selectCurrentUser, selectCurrentUserId } from '../user/user.selectors';
import { selectPlaylistDraft, selectCurrentPlaylistId, selectPlaylistById } from './playlist.selectors';
import { fetchVideos } from '../video/video.actions';
import { fetchTopPlaylistsSuccess, fetchPlaylistSuccess, createPlaylistSuccess, editPlaylistSuccess, playlistDraftVideoAdd, fetchMyPlaylistsSuccess, editPlaylistFailure } from './playlist.actions';

function* onFetchTopPlaylistsStart() {
	yield takeLatest(FETCH_TOP_PLAYLISTS, fetchTopPlaylistsAsync);
};

function* onFetchMyPlaylistsStart() {
	yield takeLatest(FETCH_MY_PLAYLISTS, fetchMyPlaylistsAsync);
};

function* onFetchPlaylistStart() {
	yield takeLatest(FETCH_PLAYLIST, fetchPlaylistAsync);
};

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

function* onEditPlaylist() {
	yield takeEvery(SAVE_PLAYLIST_EDIT, savePlaylistEditAsync);
}

function* onPlaylistDraftVideoAdd() {
	yield takeEvery(PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, playlistDraftVideoAddWithCurrentUser);
}

function* onAddComment() {
	yield takeEvery(ADD_COMMENT_TO_CURRENT_PLAYLIST, addCommentToCurrentPlaylist);
}

function* onAddCommentDB() {
	yield takeEvery(ADD_COMMENT, addCommentDB);
}

function* fetchTopPlaylistsAsync() {
	try {
		const playlistsMap = yield getCollectionMap('playlists');
		yield put(fetchTopPlaylistsSuccess(playlistsMap));
	} catch (error) {
		console.log(error);
	}
};

function* fetchMyPlaylistsAsync() {
	try {
		const currentUserId = yield select(selectCurrentUserId);
		const playlistsMap = yield getMyPlaylists(currentUserId);
		yield put(fetchMyPlaylistsSuccess(playlistsMap));
	} catch (error) {
		console.log(error);
	}
};

function* fetchPlaylistAsync({ payload: { playlistId } }) {
	try {
		const playlist = yield getPlaylist(playlistId);
		yield put(fetchPlaylistSuccess(playlist));
		yield put(fetchVideos({
			ids: playlist.videos.orderedIds
		}));
	} catch (error) {
		console.log(error);
	}
};

function* addVideoToCurrentPlaylist({ payload: { video } }) {
	const currentPlaylistId = yield select(selectCurrentPlaylistId);
	const currentUser = yield select(selectCurrentUser);

	yield put({
		type: ADD_VIDEO,
		payload: {
			playlistId: currentPlaylistId,
			video: {
				...video,
				addedBy: {
					id: currentUser.id,
					name: currentUser.displayName
				},
				timestampAdded: Date.now()
			}
		}
	});
}

function* addVideoDB({ payload: { playlistId, video } }) {
	yield addVideoToPlaylist(playlistId, video);
}

function* removeVideoDB({ payload: { videoId } }) {
	const currentPlaylistId = yield select(selectCurrentPlaylistId);
	yield removeVideoFromPlaylist(currentPlaylistId, videoId);
}

function* toggleLike({ payload }) {
	const currentUser = yield select(selectCurrentUser);
	const currentPlaylistId = yield select(selectCurrentPlaylistId);

	yield put({
		type: TOGGLE_LIKE,
		payload: {
			...payload,
			playlistId: currentPlaylistId,
			user: {
				id: currentUser.id,
				name: currentUser.displayName
			}
		}
	});
}

function* toggleLikeDB({ payload: { playlistId, videoId, user, like } }) {
	yield updateVideoLikes(playlistId, videoId, user, like);
}

function* createPlaylistAsync({ payload: { name, description, image } }) {
	try {
		let imageUrl = null;
		if (image) {
			imageUrl = yield uploadPlaylistImage(image);
		}

		const currentUser = yield select(selectCurrentUser);
		const playlistDraft = yield select(selectPlaylistDraft);
		const videosStaticData = {};
		const playlistDraftVideos = playlistDraft.videos || [];
		const videosPlaylistData = {
			byId: {},
			orderedIds: playlistDraftVideos.map(video => video.id)
		};
		playlistDraftVideos.forEach(video => {
			videosStaticData[video.id] = {
				id: video.id,
				youtubeData: video.youtubeData
			};
			videosPlaylistData.byId[video.id] = {
				id: video.id,
				addedBy: video.addedBy,
				likedBy: video.likedBy,
				timestampAdded: video.timestampAdded
			};
		});
		const newPlaylist = {
			name,
			description,
			author: {
				id: currentUser.id,
				name: currentUser.displayName
			},
			imageUrl,
			comments: {
				byId: {},
				orderedIds: []
			},
			videos: videosPlaylistData
		};
		
		const addedPlaylist = yield addDocument('playlists', newPlaylist);
		yield addCollectionAndDocuments('videos', videosStaticData);

		yield put(createPlaylistSuccess({
			playlist: addedPlaylist,
			videos: videosStaticData
		}));
		history.push(`/edit/${addedPlaylist.id}`);
	} catch (error) {
		console.log(error);
	}
};

function* savePlaylistEditAsync({ payload: { playlistId } }) {
	try {
		const playlistDraft = yield select(selectPlaylistDraft);
		const playlist = yield select(selectPlaylistById, playlistId);
		let imageUrl;
		if (playlistDraft.image) {
			imageUrl = yield uploadPlaylistImage(playlistDraft.image);
		}

		const videosStaticData = {};
		const playlistDraftVideos = playlistDraft.videos || [];
		const videosPlaylistData = {
			byId: {},
			orderedIds: playlistDraftVideos.map(video => video.id)
		};
		playlistDraftVideos.forEach(video => {
			videosStaticData[video.id] = {
				id: video.id,
				youtubeData: video.youtubeData
			};
			videosPlaylistData.byId[video.id] = {
				id: video.id,
				addedBy: video.addedBy,
				likedBy: video.likedBy,
				timestampAdded: video.timestampAdded
			};
		});
		const editedPlaylist = {
			id: playlistId,
			name: playlistDraft.name || playlist.name,
			description: playlistDraft.description || playlist.description,
			imageUrl: imageUrl || playlist.imageUrl
		};
		if (playlistDraft.videos) editedPlaylist.videos = videosPlaylistData;
		
		yield updateDocument('playlists', editedPlaylist);
		yield addCollectionAndDocuments('videos', videosStaticData);

		yield put(editPlaylistSuccess({
			playlist: {
				...editedPlaylist
			},
			videos: videosStaticData
		}));
	} catch (error) {
		yield put(editPlaylistFailure());
		console.log(error);
	}
};

function* playlistDraftVideoAddWithCurrentUser({ payload: { video, playlistId } }) {
	const currentUser = yield select(selectCurrentUser);
	yield put(playlistDraftVideoAdd({
		playlistId,
		video: {
			...video,
			addedBy: {
				id: currentUser.id,
				name: currentUser.displayName
			},
			timestampAdded: Date.now()
		}
	}));
}

function* addCommentToCurrentPlaylist({ payload: { commentText } }) {
	const currentPlaylistId = yield select(selectCurrentPlaylistId);
	const currentUser = yield select(selectCurrentUser);
	const commentId = uuid();

	yield put({
		type: ADD_COMMENT,
		payload: {
			playlistId: currentPlaylistId,
			comment: {
				id: commentId,
				text: commentText,
				author: {
					id: currentUser.id,
					name: currentUser.displayName
				},
				timestampAdded: Date.now()
			}
		}
	});
}

function* addCommentDB({ payload: { playlistId, comment } }) {
	yield addCommentToPlaylist(playlistId, comment);
}

export function* playlistSagas() {
	yield all([
		call(onFetchTopPlaylistsStart),
		call(onFetchMyPlaylistsStart),
		call(onFetchPlaylistStart),
		call(onAddVideo),
		call(onAddVideoDB),
		call(onRemoveVideo),
		call(onCreatePlaylist),
		call(onEditPlaylist),
		call(onPlaylistDraftVideoAdd),
		call(onToggleLike),
		call(onToggleLikeDB),
		call(onAddComment),
		call(onAddCommentDB)
	]);
}