import { ADD_VIDEO, REMOVE_VIDEO } from './playlist.types';

export const addVideo = video => ({
	type: ADD_VIDEO,
	payload: video
});

export const removeVideo = (playlistId, videoId) => ({
	type: REMOVE_VIDEO,
	payload: {
		playlistId,
		videoId
	}
});