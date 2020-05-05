import { FETCH_VIDEOS, FETCH_TOP_VIDEOS, VIDEO_SET_PAUSE, VIDEO_SET_PLAY, VIDEO_PAUSED_VIA_SOCKET, VIDEO_PLAYED_VIA_SOCKET } from './video.types';

export const fetchTopVideos = () => ({
	type: FETCH_TOP_VIDEOS
});

export const fetchVideos = payload => ({
	type: FETCH_VIDEOS,
	payload
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