import { ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, SET_CURRENT_PLAYLIST, TOGGLE_LIKE_WITH_CURRENT_USER } from './playlist.types';

export const addVideoToCurrentPlaylist = payload => ({
	type: ADD_VIDEO_TO_CURRENT_PLAYLIST,
	payload
});

export const removeVideoFromCurrentPlaylist = payload => ({
	type: REMOVE_VIDEO_FROM_CURRENT_PLAYLIST,
	payload
});

export const setCurrentPlaylist = payload => ({
	type: SET_CURRENT_PLAYLIST,
	payload
});

export const toggleLike = payload => ({
	type: TOGGLE_LIKE_WITH_CURRENT_USER,
	payload
});