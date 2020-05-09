import { all, call } from 'redux-saga/effects';
import { searchSagas } from './search/search.sagas';
import { playlistSagas } from './playlist/playlist.sagas';
import { socketSagas } from './socket/socket.sagas';
import { videoSagas } from './video/video.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
	yield all([
		call(playlistSagas),
		call(videoSagas),
		call(searchSagas),
		call(socketSagas),
		call(userSagas)
	]);
}