export const selectAllPlaylists = state => {
	const playlistsObject = state.playlist.allPlaylists;
	return Object.keys(playlistsObject).map(id => {
		return {
			...playlistsObject[id],
			id
		}
	});
};

export const selectMyPlaylists = state => {
	const playlistsObject = state.playlist.allPlaylists;
	const currentUserName = state.user.currentUser.name;
	return Object.keys(playlistsObject).reduce((filteredArray, id) => {
		if (playlistsObject[id].author === currentUserName) {
			filteredArray.push({
				...playlistsObject[id],
				id
			});
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
		id: playlistId,
		...playlist,
		videos: videosArray
	};
};

export const selectCurrentPlaylist = state => {
	const currentPlaylistId = state.playlist.currentPlaylistId;
	if (!currentPlaylistId) return;

	return state.playlist.allPlaylists[currentPlaylistId];
};

export const selectPlaylistDraftVideos = state => state.playlist.playlistDraftVideos;

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

	return Object.keys(video.likedBy).length;
};

export const selectIsVideoLikedByCurrentUser = (state, videoId) => {
	const currentPlaylist = selectCurrentPlaylist(state);
	const video = currentPlaylist.videos.byId[videoId];
	const currentUserId = state.user.currentUser.name;

	return !!video.likedBy[currentUserId];
};