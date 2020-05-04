import { takeLatest, call, all, put } from 'redux-saga/effects';
import { getTopVideos } from '../../firebase/firebase.utils';
import { FETCH_TOP_VIDEOS, FETCH_TOP_VIDEOS_SUCCESS } from './video.types';

function* onFetchVideosStart() {
	yield takeLatest(FETCH_TOP_VIDEOS, fetchTopVideosAsync);
};

const fetchTopVideosSuccess = videosMap => ({
	type: FETCH_TOP_VIDEOS_SUCCESS,
	payload: {
		videos: videosMap
	}
});

function* fetchTopVideosAsync() {
	try {
		const videosMap = yield getTopVideos(2);
		yield put(fetchTopVideosSuccess(videosMap));
	} catch (error) {
		console.log(error);
	}
};

export function* videoSagas() {
	yield all([
		call(onFetchVideosStart)
	]);
}