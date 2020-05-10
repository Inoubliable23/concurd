import { take, put, call, all, fork, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

import { VIDEO_SET_PAUSE, VIDEO_SET_PLAY } from '../video/video.types';
import { videoPausedViaSocket, videoPlayedViaSocket } from '../video/video.actions';
import { TOGGLE_LIKE, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, ADD_COMMENT } from '../playlist/playlist.types';
import { selectCurrentUserId } from '../user/user.selectors';
import { CONNECT_TO_SOCKET } from './socket.types';
import { likeToggledViaSocket, videoAddedViaSocket, videoRemovedViaSocket } from './socket.actions';
import { commentAddedViaSocket } from '../playlist/playlist.actions';

const SOCKET_SERVER_URL = 'http://localhost:5000/';
const SocketEvents = {
	USER_JOINED: 'user joined',
	VIDEO_LIKE_TOGGLE: 'video like toggle',
	VIDEO_ADD: 'add',
	VIDEO_REMOVE: 'remove',
	VIDEO_PLAY: 'play',
	VIDEO_PAUSE: 'pause',
	COMMENT_ADD: 'comment add'
};

function* onConnectToSocket() {
	const { payload: { playlistId } } = yield take(CONNECT_TO_SOCKET);
	const currentUserId = yield select(selectCurrentUserId);
	const socket = yield call(connect, {
		playlistId,
		currentUserId
	});
	yield fork(read, socket);
	yield fork(write, socket);
}

function connect({ playlistId, currentUserId }) {
	const socket = io(SOCKET_SERVER_URL, {
		query: {
			playlistId,
			userId: currentUserId
		}
	});
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

		const handleUserJoined = ({ userId }) => {
			console.log(`User ${userId} joined the playlist!`);
		}

		const handleVideoLikeToggle = data => {
			emit(likeToggledViaSocket(data));
		}

		const handleAdd = data => {
			emit(videoAddedViaSocket(data));
		}

		const handleRemove = data => {
			emit(videoRemovedViaSocket(data));
		}

		const handlePlay = () => {
			emit(videoPlayedViaSocket());
		}

		const handlePause = () => {
			emit(videoPausedViaSocket());
		}

		const handleCommentAdd = data => {
			emit(commentAddedViaSocket(data));
		}
		
		socket.on(SocketEvents.USER_JOINED, handleUserJoined);
		socket.on(SocketEvents.VIDEO_LIKE_TOGGLE, handleVideoLikeToggle);
		socket.on(SocketEvents.VIDEO_ADD, handleAdd);
		socket.on(SocketEvents.VIDEO_REMOVE, handleRemove);
		socket.on(SocketEvents.VIDEO_PLAY, handlePlay);
		socket.on(SocketEvents.VIDEO_PAUSE, handlePause);
		socket.on(SocketEvents.COMMENT_ADD, handleCommentAdd);
		
		// unsubscribe
		return () => {
			socket.off(SocketEvents.USER_JOINED, handleUserJoined);
			socket.off(SocketEvents.VIDEO_LIKE_TOGGLE, handleVideoLikeToggle);
			socket.off(SocketEvents.VIDEO_ADD, handleAdd);
			socket.off(SocketEvents.VIDEO_REMOVE, handleRemove);
			socket.off(SocketEvents.VIDEO_PLAY, handlePlay);
			socket.off(SocketEvents.VIDEO_PAUSE, handlePause);
			socket.off(SocketEvents.COMMENT_ADD, handleCommentAdd);
		};
	});
}

function* write(socket) {
  yield fork(emitLikeToggle, socket);
  yield fork(emitVideoAdd, socket);
  yield fork(emitVideoRemove, socket);
  yield fork(emitVideoPlay, socket);
	yield fork(emitVideoPause, socket);
	yield fork(emitCommentAdd, socket);
}

function* emitLikeToggle(socket) {
  while (true) {
		const { payload: { videoId } } = yield take(TOGGLE_LIKE);
    socket.emit(SocketEvents.VIDEO_LIKE_TOGGLE, {
			videoId
		});
  }
}

function* emitVideoAdd(socket) {
  while (true) {
    const { payload: { video } } = yield take(ADD_VIDEO_TO_CURRENT_PLAYLIST);
    socket.emit(SocketEvents.VIDEO_ADD, {
			video
		});
  }
}

function* emitVideoRemove(socket) {
  while (true) {
    const { payload: { videoId } } = yield take(REMOVE_VIDEO_FROM_CURRENT_PLAYLIST);
    socket.emit(SocketEvents.VIDEO_REMOVE, {
			videoId
		});
  }
}

function* emitVideoPlay(socket) {
  while (true) {
    yield take(VIDEO_SET_PLAY);
    socket.emit(SocketEvents.VIDEO_PLAY);
  }
}

function* emitVideoPause(socket) {
  while (true) {
    yield take(VIDEO_SET_PAUSE);
    socket.emit(SocketEvents.VIDEO_PAUSE);
  }
}

function* emitCommentAdd(socket) {
  while (true) {
    const { payload: { comment } } = yield take(ADD_COMMENT);
    socket.emit(SocketEvents.COMMENT_ADD, {
			comment
		});
  }
}

export function* socketSagas() {
	yield all([
		call(onConnectToSocket)
	]);
}