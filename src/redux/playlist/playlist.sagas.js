import { takeEvery, call, all, put, select } from 'redux-saga/effects';
import { ADD_VIDEO_TO_CURRENT_PLAYLIST, ADD_VIDEO, TOGGLE_LIKE_WITH_CURRENT_USER, TOGGLE_LIKE } from './playlist.types';
import { selectCurrentUserId } from '../user/user.selectors';

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

export function* playlistSagas() {
	yield all([
		call(onAddVideo),
		call(onToggleLike)
	]);
}