import { FETCH_SEARCH_START, CLEAR_SEARCH_RESULTS } from './search.types';

export const fetchSearchStart = queryString => ({
	type: FETCH_SEARCH_START,
	payload: {
		queryString
	}
});

export const clearSearchResults = () => ({
	type: CLEAR_SEARCH_RESULTS
});