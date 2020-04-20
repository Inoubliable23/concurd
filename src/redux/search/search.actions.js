import { FETCH_SEARCH_START, CLEAR_SEARCH_RESULTS } from './search.types';

export const fetchSearchStart = payload => ({
	type: FETCH_SEARCH_START,
	payload
});

export const clearSearchResults = () => ({
	type: CLEAR_SEARCH_RESULTS
});