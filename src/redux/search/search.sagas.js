import { throttle, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_SEARCH_START, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE } from './search.types';

export function* onFetchSearchStart() {
	yield throttle(500, FETCH_SEARCH_START, fetchSearchAsync);
}

const fetchSearchSuccess = ({ queryString, searchResults }) => ({
	type: FETCH_SEARCH_SUCCESS,
	payload: {
		queryString,
		searchResults
	}
});

const fetchSearchFailure = errorMessage => ({
	type: FETCH_SEARCH_FAILURE,
	payload: {
		errorMessage
	}
});

function* fetchSearchAsync({ payload: { queryString } }) {
	try {
		const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

		const response = yield axios.get(`${YOUTUBE_API_URL}/search`, {
			params: {
				key: process.env.REACT_APP_YOUTUBE_API_KEY,
				part: 'snippet',
				type: 'video',
				q: queryString
			}
		});
		const searchResults = response.data.items;
		const searchResultsMapped = searchResults.map(searchResult => {
			const parsedTitle = searchResult.snippet.title.replace(/&#39;/g, '\'');
			return {
				id: searchResult.id.videoId,
				title: parsedTitle,
				thumbnailUrl: searchResult.snippet.thumbnails.default.url,
				channelName: searchResult.snippet.channelTitle
			}
		});

		yield put(fetchSearchSuccess({
			queryString,
			searchResults: searchResultsMapped
		}));
	} catch(error) {
		yield put(fetchSearchFailure(error.message));
	}
}

export function* searchSagas() {
	yield all([
		call(onFetchSearchStart)
	]);
}