export const selectAllPlaylists = state => {
	const playlistsObject = state.playlist.allPlaylists;
	return Object.keys(playlistsObject).map(id => {
		return playlistsObject[id];
	});
};

export const selectMyPlaylists = state => {
	if (!state.user.currentUser) return;

	const currentUser = state.user.currentUser;
	const playlistsObject = state.playlist.allPlaylists;
	return Object.keys(playlistsObject).reduce((filteredArray, id) => {
		if (playlistsObject[id].author.id === currentUser.id) {
			filteredArray.push(playlistsObject[id]);
		}
		return filteredArray;
	}, []);
};

export const selectPlaylistById = (state, playlistId) => {
	const playlist = state.playlist.allPlaylists[playlistId];
	const videosArray = playlist.videos.orderedIds.map(videoId => {
		return {
			...playlist.videos.byId[videoId],
			...state.video.allVideos[videoId]
		}
	});
	return {
		...playlist,
		videos: videosArray
	};
};

export const selectCurrentPlaylistId = state => state.playlist.currentPlaylistId;

export const selectCurrentPlaylist = state => {
	const currentPlaylistId = selectCurrentPlaylistId(state);
	if (!currentPlaylistId) return;

	return state.playlist.allPlaylists[currentPlaylistId];
};

export const selectCurrentVideoId = state => state.playlist.currentVideoId;

export const selectPlaylistDraftVideos = state => {
	return state.playlist.playlistDraftVideos.map(draftVideo => {
		return {
			...draftVideo,
			...state.video.allVideos[draftVideo.id]
		}
	});
};

export const selectPlaylistVideosWithData = state => {
	const currentPlaylist = selectCurrentPlaylist(state);

	const videosWithData = currentPlaylist.videos.orderedIds.map(id => {
		return {
			...currentPlaylist.videos.byId[id],
			...state.video.allVideos[id]
		}
	});
	return videosWithData;
};

export const selectLikesCount = (state, videoId) => {
	const currentPlaylist = selectCurrentPlaylist(state);
	const video = currentPlaylist.videos.byId[videoId];

	return Object.keys(video.likedBy).reduce((likesCount, id) => {
		if (video.likedBy[id]) return likesCount + 1;
		return likesCount;
	}, 0);
};

export const selectIsVideoLikedByCurrentUser = (state, videoId) => {
	const currentPlaylist = selectCurrentPlaylist(state);
	const video = currentPlaylist.videos.byId[videoId];
	const currentUserId = state.user.currentUser.id;

	return !!video.likedBy[currentUserId];
};