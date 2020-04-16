export const selectPlaylist = (state, playlistId) => {
	const playlist = state.playlists.playlists[playlistId];
	const videosById = playlist.videos.byId;
	const orderedIds = playlist.videos.orderedIds;
	const orderedVideos = orderedIds.map(id => videosById[id]);

	return {
		...playlist,
		videos: orderedVideos
	};
};