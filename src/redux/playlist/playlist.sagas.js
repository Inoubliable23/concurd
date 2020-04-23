import { takeEvery, takeLatest, call, all, put, select } from 'redux-saga/effects';
import { ADD_VIDEO_TO_CURRENT_PLAYLIST, ADD_VIDEO, TOGGLE_LIKE_WITH_CURRENT_USER, TOGGLE_LIKE, FETCH_TOP_PLAYLISTS, FETCH_TOP_PLAYLISTS_SUCCESS } from './playlist.types';
import { selectCurrentUserId } from '../user/user.selectors';
import { firestore, convertSnapshotToMap } from '../../firebase/firebase.utils';

function* onAddVideo() {
	yield takeEvery(ADD_VIDEO_TO_CURRENT_PLAYLIST, addVideo);
}

function* onToggleLike() {
	yield takeEvery(TOGGLE_LIKE_WITH_CURRENT_USER, toggleLike);
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

export function* playlistSagas() {
	yield all([
		call(onFetchPlaylistsStart),
		call(onAddVideo),
		call(onToggleLike)
	]);
}