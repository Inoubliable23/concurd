export const selectAllVideos = state => {
	const videosObject = state.video.allVideos;
	return Object.keys(videosObject).map(id => videosObject[id]);
}

export const selectTopVideos = state => {
	const videos = selectAllVideos(state);
	return videos.splice(0, 5);
}