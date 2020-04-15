export const selectVideos = (state, playlistId) => state.playlists.playlists[playlistId].videos;

export const selectOrderedVideosIds = (state, playlistId) => state.playlists.playlists[playlistId].videosIdsOrder;