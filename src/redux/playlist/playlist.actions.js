import { FETCH_PLAYLIST, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, SET_CURRENT_PLAYLIST, TOGGLE_LIKE_WITH_CURRENT_USER, FETCH_TOP_PLAYLISTS, CREATE_PLAYLIST, PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, PLAYLIST_DRAFT_REMOVE_VIDEO, EDIT_PLAYLIST, EDITING_START, CREATING_START } from './playlist.types';

export const fetchTopPlaylists = () => ({
	type: FETCH_TOP_PLAYLISTS
});

export const fetchPlaylist = payload => ({
	type: FETCH_PLAYLIST,
	payload
});

export const editingStart = payload => ({
	type: EDITING_START,
	payload
});

export const creatingStart = () => ({
	type: CREATING_START
});

export const playlistDraftAddVideoWithCurrentUser = payload => ({
	type: PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER,
	payload
});

export const playlistDraftRemoveVideo = payload => ({
	type: PLAYLIST_DRAFT_REMOVE_VIDEO,
	payload
});

export const createPlaylist = payload => ({
	type: CREATE_PLAYLIST,
	payload
});

export const editPlaylist = payload => ({
	type: EDIT_PLAYLIST,
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

export const setCurrentPlaylist = payload => ({
	type: SET_CURRENT_PLAYLIST,
	payload
});

export const toggleLike = payload => ({
	type: TOGGLE_LIKE_WITH_CURRENT_USER,
	payload
});