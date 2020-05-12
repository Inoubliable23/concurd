import { throttle, put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_VIDEOS_SEARCH_START, FETCH_PLAYLISTS_SEARCH_START } from './search.types';
import { fetchPlaylistsSearchSuccess, fetchPlaylistsSearchFailure, fetchVideosSearchSuccess, fetchVideosSearchFailure } from './search.actions';
import { searchPlaylists } from '../../firebase/firebase.utils';

function* onFetchPlaylistsSearchStart() {
	yield takeLatest(FETCH_PLAYLISTS_SEARCH_START, fetchPlaylistsSearchAsync);
}

function* onFetchVideosSearchStart() {
	yield throttle(500, FETCH_VIDEOS_SEARCH_START, fetchVideosSearchAsync);
}

function* fetchPlaylistsSearchAsync({ payload: { queryString } }) {
	try {
		const playlists = yield searchPlaylists(queryString);
		console.log(playlists);

		yield put(fetchPlaylistsSearchSuccess({
			queryString,
			searchResults: playlists
		}));
	} catch(error) {
		yield put(fetchPlaylistsSearchFailure(error.message));
	}
}

function* fetchVideosSearchAsync({ payload: { queryString } }) {
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
			const parsedTitle = searchResult.snippet.title.replace(/&#39;/g, '\'').replace(/&quot;/g, '"');
			return {
				id: searchResult.id.videoId,
				youtubeData: {
					title: parsedTitle,
					thumbnailUrl: searchResult.snippet.thumbnails.default.url,
					channelName: searchResult.snippet.channelTitle
				}
			}
		});

		yield put(fetchVideosSearchSuccess({
			queryString,
			searchResults: searchResultsMapped
		}));
	} catch(error) {
		yield put(fetchVideosSearchFailure(error.message));
	}
}

export function* searchSagas() {
	yield all([
		call(onFetchPlaylistsSearchStart),
		call(onFetchVideosSearchStart)
	]);
}