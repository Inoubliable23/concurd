import { combineReducers } from 'redux';
import playlistReducer from './playlist/playlist.reducer';
import searchReducer from './search/search.reducer';

const rootReducer = combineReducers({
	playlists: playlistReducer,
	search: searchReducer
});

export default rootReducer;