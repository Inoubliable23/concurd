export const selectTopVideos = state => {
	const ids = state.video.topVideosIds;
	return ids.map(id => state.video.allVideos[id]);
}