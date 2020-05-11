import produce from 'immer';
import { SET_CURRENT_PLAYLIST, TOGGLE_LIKE, ADD_VIDEO, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, FETCH_TOP_PLAYLISTS_SUCCESS, CREATE_PLAYLIST_SUCCESS, PLAYLIST_DRAFT_ADD_VIDEO, PLAYLIST_DRAFT_REMOVE_VIDEO, SAVE_PLAYLIST_EDIT_SUCCESS, CREATING_START, FETCH_PLAYLIST_SUCCESS, SET_CURRENT_VIDEO, ADD_COMMENT, COMMENT_ADDED_VIA_SOCKET, FETCH_MY_PLAYLISTS_SUCCESS, SET_DRAFT_DATA, SAVE_PLAYLIST_EDIT_FAILURE } from './playlist.types';
import { LIKE_TOGGLED_VIA_SOCKET, VIDEO_ADDED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET } from '../socket/socket.types';

const initialState = {
	currentPlaylistId: null,
	currentVideoId: null,
	allPlaylists: {},
	playlistDraft: {}
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case FETCH_TOP_PLAYLISTS_SUCCESS:
			case FETCH_MY_PLAYLISTS_SUCCESS: {
				draft.allPlaylists = {
					...draft.allPlaylists,
					...payload.playlists
				};
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
				draft.playlistDraft = {};
				break;
			}
			case SET_DRAFT_DATA: {
				draft.playlistDraft = {
					...draft.playlistDraft,
					...payload
				};
				break;
			}
			case PLAYLIST_DRAFT_ADD_VIDEO: {
				const { video, playlistId } = payload;
				const videoObject = {
					id: video.id,
					addedBy: video.addedBy,
					timestampAdded: video.timestampAdded,
					likedBy: {}
				};

				if (!draft.playlistDraft.videos) {
					if (!playlistId) {
						draft.playlistDraft.videos = [videoObject];
						break;
					}
					const playlistVideos = draft.allPlaylists[playlistId].videos;
					draft.playlistDraft.videos = playlistVideos.orderedIds.map(id => playlistVideos.byId[id]);
				}
				draft.playlistDraft.videos.push(videoObject);
				break;
			}
			case PLAYLIST_DRAFT_REMOVE_VIDEO: {
				const { videoId, playlistId } = payload;
				if (!draft.playlistDraft.videos) {
					const playlistVideos = draft.allPlaylists[playlistId].videos;
					draft.playlistDraft.videos = playlistVideos.orderedIds.map(id => playlistVideos.byId[id]);
				}
				draft.playlistDraft.videos = draft.playlistDraft.videos.filter(video => video.id !== videoId);
				break;
			}

			case CREATE_PLAYLIST_SUCCESS:
			case SAVE_PLAYLIST_EDIT_SUCCESS: {
				const { playlist } = payload;
				draft.allPlaylists[playlist.id] = {
					...draft.allPlaylists[playlist.id],
					...playlist
				};
				draft.playlistDraft = {};
				break;
			}
			case SAVE_PLAYLIST_EDIT_FAILURE: {
				draft.playlistDraft = {};
				break;
			}

			case ADD_VIDEO:
			case VIDEO_ADDED_VIA_SOCKET: {
				const { video } = payload;
				const playlistVideoObject = {
					id: video.id,
					addedBy: video.addedBy,
					timestampAdded: video.timestampAdded,
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
				const { videoId, user } = payload;
				const currentPlaylist = draft.allPlaylists[state.currentPlaylistId];
				const video = currentPlaylist.videos.byId[videoId];
				const isLiked = video.likedBy[user.id];
				isLiked ? delete video.likedBy[user.id] : video.likedBy[user.id] = true;

				currentPlaylist.videos.orderedIds.sort((a, b) => {
					const likesCountA = Object.keys(currentPlaylist.videos.byId[a].likedBy).length;
					const likesCountB = Object.keys(currentPlaylist.videos.byId[b].likedBy).length;

					return likesCountB - likesCountA;
				});

				break;
			}

			case ADD_COMMENT:
			case COMMENT_ADDED_VIA_SOCKET: {
				const { comment } = payload;
				draft.allPlaylists[state.currentPlaylistId].comments.byId[comment.id] = comment;
				draft.allPlaylists[state.currentPlaylistId].comments.orderedIds.push(comment.id);
				break;
			}

			default:
				return draft;
		}
	});
}