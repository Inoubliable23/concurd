import produce from 'immer';
import { FETCH_VIDEOS_SEARCH_START, FETCH_VIDEOS_SEARCH_FAILURE, FETCH_VIDEOS_SEARCH_SUCCESS, CLEAR_PLAYLISTS_SEARCH_RESULTS, CLEAR_VIDEOS_SEARCH_RESULTS, FETCH_PLAYLISTS_SEARCH_START, FETCH_PLAYLISTS_SEARCH_SUCCESS, FETCH_PLAYLISTS_SEARCH_FAILURE } from './search.types';

const initialState = {
	playlistsSearchResults: [{
		id: 'Kvfh9zccPxyW9dcnXzbO',
		description: 'sfhs',
		author: {
			id: 'HPzmKbLUMBdBlSaPCLSkenLWYAJ3',
			name: 'Tim Janzelj'
		},
		name: 'e',
		videos: {
			orderedIds: [],
			byId: {}
		},
		imageUrl: 'https://firebasestorage.googleapis.com/v0/b/concurd.appspot.com/o/playlist_images%2FDNukikuX0AAhUY2.jpg?alt=media&token=e6ca8c7e-e3a8-4082-99ed-9c2f96a9f6e1',
		comments: {
			orderedIds: [],
			byId: {}
		}
	}],
	videosSearchResults: [],
	isFetching: false,
	errorMessage: null
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case FETCH_PLAYLISTS_SEARCH_START:
				draft.isFetching = true;
				break;
			case FETCH_PLAYLISTS_SEARCH_SUCCESS:
				draft.isFetching = false;
				draft.playlistsSearchResults = payload.searchResults;
				break;
			case FETCH_PLAYLISTS_SEARCH_FAILURE:
				draft.isFetching = false;
				draft.errorMessage = payload.errorMessage;
				break;

			case FETCH_VIDEOS_SEARCH_START:
				draft.isFetching = true;
				break;
			case FETCH_VIDEOS_SEARCH_SUCCESS:
				draft.isFetching = false;
				draft.videosSearchResults = payload.searchResults;
				break;
			case FETCH_VIDEOS_SEARCH_FAILURE:
				draft.isFetching = false;
				draft.errorMessage = payload.errorMessage;
				break;

			case CLEAR_PLAYLISTS_SEARCH_RESULTS:
				draft.playlistsSearchResults = [];
				break;
			case CLEAR_VIDEOS_SEARCH_RESULTS:
				draft.videosSearchResults = [];
				break;

			default:
				return draft;
		}
	});
}