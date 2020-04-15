import { combineReducers } from 'redux';
import playlistReducer from './playlist/playlist.reducer';

const rootReducer = combineReducers({
	playlists: playlistReducer
});

export default rootReducer;