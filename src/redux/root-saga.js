import { all, call } from 'redux-saga/effects';
import { searchSagas } from './search/search.sagas';

export default function* rootSaga() {
	yield all([
		call(searchSagas)
	]);
}