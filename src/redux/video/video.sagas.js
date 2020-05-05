import { takeLatest, call, all, put } from 'redux-saga/effects';
import { getTopVideos, getVideosByIds } from '../../firebase/firebase.utils';
import { FETCH_TOP_VIDEOS, FETCH_TOP_VIDEOS_SUCCESS, FETCH_VIDEOS, FETCH_VIDEOS_SUCCESS } from './video.types';

function* onFetchVideosStart() {
	yield takeLatest(FETCH_VIDEOS, fetchVideosAsync);
};

function* onFetchTopVideosStart() {
	yield takeLatest(FETCH_TOP_VIDEOS, fetchTopVideosAsync);
};

const fetchVideosSuccess = videosArray => ({
	type: FETCH_VIDEOS_SUCCESS,
	payload: {
		videosArray
	}
});

function* fetchVideosAsync({ payload: { ids } }) {
	try {
		const videosArray = yield getVideosByIds(ids);
		yield put(fetchVideosSuccess(videosArray));
	} catch (error) {
		console.log(error);
	}
};

const fetchTopVideosSuccess = videosArray => ({
	type: FETCH_TOP_VIDEOS_SUCCESS,
	payload: {
		videosArray
	}
});

function* fetchTopVideosAsync() {
	try {
		const videosArray = yield getTopVideos(5);
		yield put(fetchTopVideosSuccess(videosArray));
	} catch (error) {
		console.log(error);
	}
};

export function* videoSagas() {
	yield all([
		call(onFetchTopVideosStart),
		call(onFetchVideosStart)
	]);
}