export const selectAllPlaylists = state => {
	const playlistsObject = state.playlist.allPlaylists;
	return Object.keys(playlistsObject).map(id => playlistsObject[id]);
};

export const selectCurrentPlaylist = state => {
	const currentPlaylistId = state.playlist.currentPlaylistId;
	if (!currentPlaylistId) return;

	return state.playlist.allPlaylists[currentPlaylistId];
};

export const selectPlaylistVideosWithData = state => {
	const currentPlaylist = selectCurrentPlaylist(state);

	const allVideosData = state.video.allVideos;
	const videosWithData = currentPlaylist.videos.orderedIds.map(id => {
		return {
			...currentPlaylist.videos.byId[id],
			...allVideosData[id]
		}
	});
	return videosWithData;
};

export const selectLikesCount = (state, videoId) => {
	const currentPlaylist = selectCurrentPlaylist(state);
	const video = currentPlaylist.videos.byId[videoId];

	return Object.keys(video.likedBy).length;
};

export const selectIsVideoLikedByCurrentUser = (state, videoId) => {
	const currentPlaylist = selectCurrentPlaylist(state);
	const video = currentPlaylist.videos.byId[videoId];
	const currentUserId = state.user.currentUser.name;

	return !!video.likedBy[currentUserId];
};