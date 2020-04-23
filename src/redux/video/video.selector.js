export const selectAllVideos = state => {
	const videosObject = state.video.allVideos;
	return Object.keys(videosObject).map(id => videosObject[id]);
}