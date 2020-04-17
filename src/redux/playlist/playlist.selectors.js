export const selectCurrentPlaylist = (state) => {
	const currentPlaylistId = state.playlists.currentPlaylistId;

	if (!currentPlaylistId) return null;

	const playlist = state.playlists.playlists[currentPlaylistId];
	const videosById = playlist.videos.byId;
	const orderedIds = playlist.videos.orderedIds;
	const orderedVideos = orderedIds.map(id => videosById[id]);

	return {
		...playlist,
		videos: orderedVideos
	};
};