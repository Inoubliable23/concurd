import { takeLatest, call, all, put } from 'redux-saga/effects';
import { firestore, convertSnapshotToMap } from '../../firebase/firebase.utils';
import { FETCH_TOP_VIDEOS, FETCH_TOP_VIDEOS_SUCCESS } from './video.types';

function* onFetchVideosStart() {
	yield takeLatest(FETCH_TOP_VIDEOS, fetchVideosAsync);
};

const fetchVideosSuccess = videosMap => ({
	type: FETCH_TOP_VIDEOS_SUCCESS,
	payload: {
		videos: videosMap
	}
});

function* fetchVideosAsync() {
	try {
		const videoRef = firestore.collection('videos');
		const snapshot = yield videoRef.get();
		const videosMap = yield convertSnapshotToMap(snapshot);
		yield put(fetchVideosSuccess(videosMap));
	} catch (error) {
		console.log(error);
	}
};

export function* videoSagas() {
	yield all([
		call(onFetchVideosStart)
	]);
}