import { take, put, call, all, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import { CONNECT_TO_SOCKET, VIDEO_SET_PAUSE, VIDEO_SET_PLAY } from './video.types';
import { videoPausedViaSocket, videoPlayedViaSocket } from './video.actions';

function* onConnectToSocket() {
	yield take(CONNECT_TO_SOCKET);
	const socket = yield call(connect);
	yield fork(read, socket);
	yield fork(write, socket);
}

const socketServerUrl = 'http://localhost:5000/';
function connect() {
	const socket = io(socketServerUrl);
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
			console.log('Socket connected');
		});
	});
}

function* read(socket) {
	const channel = yield call(subscribe, socket);
	while (true) {
		const action = yield take(channel);
		yield put(action);
	}
}

function subscribe(socket) {
	return eventChannel(emit => {

		const handlePlay = () => {
			emit(videoPlayedViaSocket());
		}

		const handlePause = () => {
			emit(videoPausedViaSocket());
		}
		
		socket.on('play', handlePlay);
		socket.on('pause', handlePause);
		
		// unsubscribe
		return () => {
			socket.off('play', handlePlay);
			socket.off('pause', handlePause);
		};
	});
}

function* write(socket) {
  yield fork(emitVideoPlay, socket);
	yield fork(emitVideoPause, socket);
}

function* emitVideoPlay(socket) {
  while (true) {
    yield take(VIDEO_SET_PLAY);
    socket.emit('play');
  }
}

function* emitVideoPause(socket) {
  while (true) {
    yield take(VIDEO_SET_PAUSE);
    socket.emit('pause');
  }
}

export function* videoSagas() {
	yield all([
		call(onConnectToSocket)
	]);
}