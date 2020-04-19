import playlistReducer from './playlist/playlist.reducer';
import searchReducer from './search/search.reducer';
import userReducer from './user/user.reducer';
import videoReducer from './video/video.reducer';

const rootReducer = (state = {}, action) => ({
	playlists: playlistReducer(state.playlists, action, state.user),
	search: searchReducer(state.search, action),
	user: userReducer(state.user, action),
	video: videoReducer(state.video, action)
});

export default rootReducer;