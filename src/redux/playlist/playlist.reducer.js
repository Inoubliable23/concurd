import produce from 'immer';
import { SET_CURRENT_PLAYLIST, TOGGLE_LIKE, ADD_VIDEO, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, FETCH_TOP_PLAYLISTS_SUCCESS } from './playlist.types';
import { LIKE_TOGGLED_VIA_SOCKET, VIDEO_ADDED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET } from '../socket/socket.types';

const initialState = {
	currentPlaylistId: null,
	allPlaylists: {}
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case FETCH_TOP_PLAYLISTS_SUCCESS: {
				draft.allPlaylists = payload.playlists;
				break;
			}

			case SET_CURRENT_PLAYLIST: {
				draft.currentPlaylistId = payload.playlistId;
				break;
			}

			case ADD_VIDEO:
			case VIDEO_ADDED_VIA_SOCKET: {
				const { video, userId } = payload;
				const playlistVideoObject = {
					id: video.id,
					addedBy: userId,
					likedBy: {}
				};
				const playlistToUpdate = draft.allPlaylists[state.currentPlaylistId];

				playlistToUpdate.videos.byId[video.id] = playlistVideoObject;
				playlistToUpdate.videos.orderedIds.push(video.id);
				break;
			}

			case REMOVE_VIDEO_FROM_CURRENT_PLAYLIST:
			case VIDEO_REMOVED_VIA_SOCKET: {
				const { videoId } = payload;
				const playlist = draft.allPlaylists[state.currentPlaylistId];
				const index = playlist.videos.orderedIds.indexOf(videoId);
				
				if (index > -1) {
					playlist.videos.orderedIds.splice(index, 1);
				}
				delete playlist.videos.byId[videoId];
				break;
			}

			case TOGGLE_LIKE:
			case LIKE_TOGGLED_VIA_SOCKET: {
				const { videoId, userId } = payload;
				const currentPlaylist = draft.allPlaylists[state.currentPlaylistId];
				const video = currentPlaylist.videos.byId[videoId];
				const isLiked = video.likedBy[userId];
				isLiked ? delete video.likedBy[userId] : video.likedBy[userId] = true;

				currentPlaylist.videos.orderedIds.sort((a, b) => {
					const likesCountA = Object.keys(currentPlaylist.videos.byId[a].likedBy).length;
					const likesCountB = Object.keys(currentPlaylist.videos.byId[b].likedBy).length;

					return likesCountB - likesCountA;
				});

				break;
			}

			default:
				return draft;
		}
	});
}