import { CONNECT_TO_SOCKET, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, SET_CURRENT_PLAYLIST, TOGGLE_LIKE, LIKE_TOGGLED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET, VIDEO_ADDED_VIA_SOCKET } from './playlist.types';

export const connectToSocket = payload => ({
	type: CONNECT_TO_SOCKET,
	payload
});

export const addVideoToCurrentPlaylist = payload => ({
	type: ADD_VIDEO_TO_CURRENT_PLAYLIST,
	payload
});

export const removeVideoFromCurrentPlaylist = payload => ({
	type: REMOVE_VIDEO_FROM_CURRENT_PLAYLIST,
	payload
});

export const videoAddedViaSocket = payload => ({
	type: VIDEO_ADDED_VIA_SOCKET,
	payload
});

export const videoRemovedViaSocket = payload => ({
	type: VIDEO_REMOVED_VIA_SOCKET,
	payload
});

export const setCurrentPlaylist = payload => ({
	type: SET_CURRENT_PLAYLIST,
	payload
});

export const toggleLike = payload => ({
	type: TOGGLE_LIKE,
	payload
});

export const likeToggledViaSocket = payload => ({
	type: LIKE_TOGGLED_VIA_SOCKET,
	payload
});