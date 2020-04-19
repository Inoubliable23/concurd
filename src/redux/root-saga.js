import { all, call } from 'redux-saga/effects';
import { searchSagas } from './search/search.sagas';
import { videoSagas } from './video/video.sagas';

export default function* rootSaga() {
	yield all([
		call(searchSagas),
		call(videoSagas)
	]);
}