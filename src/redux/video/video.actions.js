import { CONNECT_TO_SOCKET, VIDEO_SET_PAUSE, VIDEO_SET_PLAY, VIDEO_PAUSED_VIA_SOCKET, VIDEO_PLAYED_VIA_SOCKET } from './video.types';

export const connectToSocket = () => ({
	type: CONNECT_TO_SOCKET
});

export const videoSetPlay = () => ({
	type: VIDEO_SET_PLAY
});

export const videoSetPause = () => ({
	type: VIDEO_SET_PAUSE
});

export const videoPlayedViaSocket = () => ({
	type: VIDEO_PLAYED_VIA_SOCKET
});

export const videoPausedViaSocket = () => ({
	type: VIDEO_PAUSED_VIA_SOCKET
});