import { FETCH_MY_PLAYLISTS, FETCH_PLAYLIST, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, SET_CURRENT_PLAYLIST, TOGGLE_LIKE_WITH_CURRENT_USER, FETCH_TOP_PLAYLISTS, CREATE_PLAYLIST, PLAYLIST_DRAFT_ADD_VIDEO_WITH_CURRENT_USER, PLAYLIST_DRAFT_REMOVE_VIDEO, SAVE_PLAYLIST_EDIT, CREATING_START, SET_CURRENT_VIDEO, FETCH_TOP_PLAYLISTS_SUCCESS, FETCH_PLAYLIST_SUCCESS, CREATE_PLAYLIST_SUCCESS, SAVE_PLAYLIST_EDIT_SUCCESS, SAVE_PLAYLIST_EDIT_FAILURE, PLAYLIST_DRAFT_ADD_VIDEO, ADD_COMMENT_TO_CURRENT_PLAYLIST, ADD_COMMENT_SUCCESS, COMMENT_ADDED_VIA_SOCKET, FETCH_MY_PLAYLISTS_SUCCESS, SET_DRAFT_DATA } from './playlist.types';

export const fetchTopPlaylists = () => ({
	type: FETCH_TOP_PLAYLISTS
});

export const fetchMyPlaylists = () => ({
	type: FETCH_MY_PLAYLISTS
});

export const fetchPlaylist = payload => ({
	type: FETCH_PLAYLIST,
	payload
});

export const setDraftData = payload => ({
	type: SET_DRAFT_DATA,
	payload
});

export const savePlaylistEdit = playlistId => ({
	type: SAVE_PLAYLIST_EDIT,
	payload: {
		playlistId
	}
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

export const setCurrentVideo = payload => ({
	type: SET_CURRENT_VIDEO,
	payload
});

export const toggleLike = payload => ({
	type: TOGGLE_LIKE_WITH_CURRENT_USER,
	payload
});

export const fetchTopPlaylistsSuccess = playlistsMap => ({
	type: FETCH_TOP_PLAYLISTS_SUCCESS,
	payload: {
		playlists: playlistsMap
	}
});

export const fetchMyPlaylistsSuccess = playlistsMap => ({
	type: FETCH_MY_PLAYLISTS_SUCCESS,
	payload: {
		playlists: playlistsMap
	}
});

export const fetchPlaylistSuccess = playlist => ({
	type: FETCH_PLAYLIST_SUCCESS,
	payload: {
		playlist
	}
});

export const createPlaylistSuccess = payload => ({
	type: CREATE_PLAYLIST_SUCCESS,
	payload
});

export const editPlaylistSuccess = payload => ({
	type: SAVE_PLAYLIST_EDIT_SUCCESS,
	payload
});

export const editPlaylistFailure = () => ({
	type: SAVE_PLAYLIST_EDIT_FAILURE
});

export const playlistDraftVideoAdd = payload => ({
	type: PLAYLIST_DRAFT_ADD_VIDEO,
	payload
});

export const addCommentToCurrentPlaylist = commentText => ({
	type: ADD_COMMENT_TO_CURRENT_PLAYLIST,
	payload: {
		commentText
	}
});

export const addCommentSuccess = payload => ({
	type: ADD_COMMENT_SUCCESS,
	payload
});

export const commentAddedViaSocket = payload => ({
	type: COMMENT_ADDED_VIA_SOCKET,
	payload
});