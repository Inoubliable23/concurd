import { combineReducers } from 'redux';
import playlistReducer from './playlist/playlist.reducer';
import searchReducer from './search/search.reducer';
import userReducer from './user/user.reducer';
import videoReducer from './video/video.reducer';

const rootReducer = combineReducers({
	playlist: playlistReducer,
	search: searchReducer,
	user: userReducer,
	video: videoReducer
});

export default rootReducer;