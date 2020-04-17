import { ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, SET_CURRENT_PLAYLIST } from './playlist.types';

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