import { ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, SET_CURRENT_PLAYLIST, TOGGLE_LIKE_WITH_CURRENT_USER, FETCH_TOP_PLAYLISTS, CREATE_PLAYLIST, CHANGE_PLAYLIST_DRAFT, PLAYLIST_DRAFT_ADD_VIDEO, PLAYLIST_DRAFT_REMOVE_VIDEO } from './playlist.types';

export const fetchTopPlaylists = () => ({
	type: FETCH_TOP_PLAYLISTS
});

export const changePlaylistDraft = () => ({
	type: CHANGE_PLAYLIST_DRAFT
});

export const playlistDraftAddVideo = payload => ({
	type: PLAYLIST_DRAFT_ADD_VIDEO,
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