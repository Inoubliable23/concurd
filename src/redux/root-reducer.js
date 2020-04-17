import playlistReducer from './playlist/playlist.reducer';
import searchReducer from './search/search.reducer';
import userReducer from './user/user.reducer';

const rootReducer = (state = {}, action) => ({
	playlists: playlistReducer(state.playlists, action, state.user),
	search: searchReducer(state.search, action),
	user: userReducer(state.user, action)
});

export default rootReducer;