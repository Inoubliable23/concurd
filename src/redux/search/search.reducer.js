import produce from 'immer';
import { FETCH_SEARCH_START, FETCH_SEARCH_FAILURE, FETCH_SEARCH_SUCCESS, CLEAR_SEARCH_RESULTS } from './search.types';

const initialState = {
	searchResults: [],
	isFetching: false,
	errorMessage: null
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case FETCH_SEARCH_START:
				draft.isFetching = true;
				break;
			case FETCH_SEARCH_SUCCESS:
				draft.isFetching = false;
				draft.searchResults = payload.searchResults;
				break;
			case FETCH_SEARCH_FAILURE:
				draft.isFetching = false;
				draft.errorMessage = payload.errorMessage;
				break;

			case CLEAR_SEARCH_RESULTS:
				draft.searchResults = [];
				break;

			default:
				return draft;
		}
	});
}