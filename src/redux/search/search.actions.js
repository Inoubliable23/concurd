import { FETCH_VIDEOS_SEARCH_START, FETCH_PLAYLISTS_SEARCH_START, CLEAR_VIDEOS_SEARCH_RESULTS, CLEAR_PLAYLISTS_SEARCH_RESULTS, FETCH_VIDEOS_SEARCH_SUCCESS, FETCH_VIDEOS_SEARCH_FAILURE, FETCH_PLAYLISTS_SEARCH_SUCCESS, FETCH_PLAYLISTS_SEARCH_FAILURE } from './search.types';

export const fetchPlaylistsSearchStart = payload => ({
	type: FETCH_PLAYLISTS_SEARCH_START,
	payload
});

export const fetchVideosSearchStart = payload => ({
	type: FETCH_VIDEOS_SEARCH_START,
	payload
});

export const fetchPlaylistsSearchSuccess = payload => ({
	type: FETCH_PLAYLISTS_SEARCH_SUCCESS,
	payload
});

export const fetchPlaylistsSearchFailure = payload => ({
	type: FETCH_PLAYLISTS_SEARCH_FAILURE,
	payload
});

export const fetchVideosSearchSuccess = payload => ({
	type: FETCH_VIDEOS_SEARCH_SUCCESS,
	payload
});

export const fetchVideosSearchFailure = payload => ({
	type: FETCH_VIDEOS_SEARCH_FAILURE,
	payload
});

export const clearPlaylistsSearchResults = () => ({
	type: CLEAR_PLAYLISTS_SEARCH_RESULTS
});

export const clearVideosSearchResults = () => ({
	type: CLEAR_VIDEOS_SEARCH_RESULTS
});