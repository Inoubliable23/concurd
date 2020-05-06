import produce from 'immer';
import { SET_CURRENT_PLAYLIST, TOGGLE_LIKE, ADD_VIDEO, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, FETCH_TOP_PLAYLISTS_SUCCESS, CREATE_PLAYLIST_SUCCESS, PLAYLIST_DRAFT_ADD_VIDEO, PLAYLIST_DRAFT_REMOVE_VIDEO, EDIT_PLAYLIST_SUCCESS, CREATE_DRAFT, CREATING_START, FETCH_PLAYLIST_SUCCESS, SET_CURRENT_VIDEO } from './playlist.types';
import { LIKE_TOGGLED_VIA_SOCKET, VIDEO_ADDED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET } from '../socket/socket.types';

const initialState = {
	currentPlaylistId: null,
	currentVideoId: null,
	allPlaylists: {},
	playlistDraftVideos: []
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case FETCH_TOP_PLAYLISTS_SUCCESS: {
				draft.allPlaylists = payload.playlists;
				break;
			}

			case FETCH_PLAYLIST_SUCCESS: {
				const { playlist } = payload;
				draft.allPlaylists[playlist.id] = playlist;
				break;
			}

			case SET_CURRENT_PLAYLIST: {
				draft.currentPlaylistId = payload.playlistId;
				break;
			}

			case SET_CURRENT_VIDEO: {
				draft.currentVideoId = payload.videoId;
				break;
			}

			case CREATING_START: {
				draft.playlistDraftVideos = [];
				break;
			}
			case CREATE_DRAFT: {
				draft.playlistDraftVideos = payload.playlist.videos;
				break;
			}
			case PLAYLIST_DRAFT_ADD_VIDEO: {
				const { video } = payload;
				draft.playlistDraftVideos.push({
					...video,
					id: video.id,
					addedBy: video.addedBy,
					timestampAdded: video.timestampAdded,
					likedBy: {}
				});
				break;
			}
			case PLAYLIST_DRAFT_REMOVE_VIDEO: {
				const { videoId } = payload;
				draft.playlistDraftVideos = draft.playlistDraftVideos.filter(video => video.id !== videoId);
				break;
			}

			case CREATE_PLAYLIST_SUCCESS:
			case EDIT_PLAYLIST_SUCCESS: {
				draft.allPlaylists[payload.playlist.id] = payload.playlist;
				break;
			}

			case ADD_VIDEO:
			case VIDEO_ADDED_VIA_SOCKET: {
				const { video, userId, timestampAdded } = payload;
				const playlistVideoObject = {
					id: video.id,
					addedBy: userId,
					timestampAdded,
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
				playlist.videos.orderedIds.splice(index, 1);

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