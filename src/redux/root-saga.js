import { all, call } from 'redux-saga/effects';
import { searchSagas } from './search/search.sagas';
import { playlistSagas } from './playlist/playlist.sagas';

export default function* rootSaga() {
	yield all([
		call(searchSagas),
		call(playlistSagas)
	]);
}