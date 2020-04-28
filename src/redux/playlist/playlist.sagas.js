import { takeEvery, takeLatest, call, all, put, select } from 'redux-saga/effects';
import { ADD_VIDEO_TO_CURRENT_PLAYLIST, ADD_VIDEO, TOGGLE_LIKE_WITH_CURRENT_USER, TOGGLE_LIKE, FETCH_TOP_PLAYLISTS, FETCH_TOP_PLAYLISTS_SUCCESS, CREATE_PLAYLIST, CREATE_PLAYLIST_SUCCESS, PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, PLAYLIST_DRAFT_ADD_VIDEO } from './playlist.types';
import { selectCurrentUserId } from '../user/user.selectors';
import { firestore, convertSnapshotToMap, uploadPlaylistImage, addDocument, addCollectionAndDocuments } from '../../firebase/firebase.utils';
import history from '../../history';
import { selectPlaylistDraftVideosObject } from './playlist.selectors';
import { selectDraftVideos } from '../video/video.selector';

function* onAddVideo() {
	yield takeEvery(ADD_VIDEO_TO_CURRENT_PLAYLIST, addVideo);
}

function* onToggleLike() {
	yield takeEvery(TOGGLE_LIKE_WITH_CURRENT_USER, toggleLike);
}

function* onCreatePlaylist() {
	yield takeEvery(CREATE_PLAYLIST, createPlaylistAsync);
}

function* onPlaylistDraftVideoAdd() {
	yield takeEvery(PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, playlistDraftVideoAddWithCurrentUser);
}

function* addVideo({ payload: { video } }) {
	const currentUserId = yield select(selectCurrentUserId);

	yield put({
		type: ADD_VIDEO,
		payload: {
			video,
			userId: currentUserId
		}
	});
}

function* toggleLike({ payload: { videoId } }) {
	const currentUserId = yield select(selectCurrentUserId);

	yield put({
		type: TOGGLE_LIKE,
		payload: {
			videoId,
			userId: currentUserId
		}
	});
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
		const playlistRef = firestore.collection('playlists');
		const snapshot = yield playlistRef.get();
		const playlistsMap = yield convertSnapshotToMap(snapshot);
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
		const playlistVideos = yield select(selectPlaylistDraftVideosObject);
		const newPlaylist = {
			name,
			description,
			author: currentUserId,
			imageUrl,
			videos: playlistVideos
		};
		const videos = yield select(selectDraftVideos);
		
		const docRef = yield addDocument('playlists', newPlaylist);
		yield addCollectionAndDocuments('videos', videos);

		yield put(createPlaylistSuccess({
			playlist: {
				...newPlaylist,
				id: docRef.id
			}
		}));
		history.push(`/edit/${docRef.id}`);
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

export function* playlistSagas() {
	yield all([
		call(onFetchPlaylistsStart),
		call(onAddVideo),
		call(onCreatePlaylist),
		call(onPlaylistDraftVideoAdd),
		call(onToggleLike)
	]);
}