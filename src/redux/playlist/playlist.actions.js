import { ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, SET_CURRENT_PLAYLIST, TOGGLE_LIKE } from './playlist.types';

export const addVideoToCurrentPlaylist = video => ({
	type: ADD_VIDEO_TO_CURRENT_PLAYLIST,
	payload: {
		video
	}
});

export const removeVideoFromCurrentPlaylist = ({ videoId }) => ({
	type: REMOVE_VIDEO_FROM_CURRENT_PLAYLIST,
	payload: {
		videoId
	}
});

export const setCurrentPlaylist = ({ playlistId }) => ({
	type: SET_CURRENT_PLAYLIST,
	payload: {
		playlistId
	}
});

export const toggleLike = ({ videoId }) => ({
	type: TOGGLE_LIKE,
	payload: {
		videoId
	}
});