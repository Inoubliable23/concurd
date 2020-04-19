export const selectCurrentPlaylist = state => {
	const currentPlaylistId = state.playlists.currentPlaylistId;
	if (!currentPlaylistId) return;

	const playlist = state.playlists.playlists[currentPlaylistId];
	const videosById = playlist.videos.byId;
	const orderedIds = playlist.videos.orderedIds;
	const orderedVideos = orderedIds.map(id => videosById[id]);

	return {
		...playlist,
		videos: orderedVideos
	};
};

export const selectLikesCount = (state, videoId) => {
	const currentPlaylistId = state.playlists.currentPlaylistId;
	if (!currentPlaylistId) return;

	const playlist = state.playlists.playlists[currentPlaylistId];
	const video = playlist.videos.byId[videoId];

	return Object.keys(video.likedBy).length;
};

export const selectIsVideoLikedByCurrentUser = (state, videoId) => {
	const currentPlaylistId = state.playlists.currentPlaylistId;
	if (!currentPlaylistId) return;

	const playlist = state.playlists.playlists[currentPlaylistId];
	const video = playlist.videos.byId[videoId];
	const currentUserId = state.user.currentUser.id;

	return !!video.likedBy[currentUserId];
};