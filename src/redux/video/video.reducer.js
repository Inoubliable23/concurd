import produce from 'immer';
import { VIDEO_SET_PLAY, VIDEO_SET_PAUSE, VIDEO_PAUSED_VIA_SOCKET, VIDEO_PLAYED_VIA_SOCKET, FETCH_TOP_VIDEOS_SUCCESS, FETCH_VIDEOS_SUCCESS } from './video.types';
import { ADD_VIDEO, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, CREATE_PLAYLIST_SUCCESS, EDIT_PLAYLIST_SUCCESS } from '../playlist/playlist.types';
import { VIDEO_ADDED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET } from '../socket/socket.types';

const initialState = {
	isPlaying: false,
	allVideos: {},
	topVideosIds: []
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case FETCH_VIDEOS_SUCCESS: {
				payload.videosArray.forEach(video => {
					draft.allVideos[video.id] = video;
				});
				break;
			}

			case FETCH_TOP_VIDEOS_SUCCESS: {
				draft.topVideosIds = [];
				payload.videosArray.forEach(video => {
					draft.allVideos[video.id] = video;
					draft.topVideosIds.push(video.id);
				});
				break;
			}

			case VIDEO_SET_PLAY: {
				draft.isPlaying = true;
				break;
			}
			case VIDEO_SET_PAUSE: {
				draft.isPlaying = false;
				break;
			}

			case VIDEO_PLAYED_VIA_SOCKET: {
				draft.isPlaying = true;
				break;
			}
			case VIDEO_PAUSED_VIA_SOCKET: {
				draft.isPlaying = false;
				break;
			}

			case ADD_VIDEO:
			case VIDEO_ADDED_VIA_SOCKET: {
				const { video } = payload;
				draft.allVideos[video.id] = video;
				break;
			}

			case REMOVE_VIDEO_FROM_CURRENT_PLAYLIST:
			case VIDEO_REMOVED_VIA_SOCKET: {
				break;
			}
			
			case CREATE_PLAYLIST_SUCCESS:
			case EDIT_PLAYLIST_SUCCESS: {
				Object.keys(payload.videos).forEach(key => {
					draft.allVideos[key] = payload.videos[key];
				});
				break;
			}

			default:
				return draft;
		}
	});
}