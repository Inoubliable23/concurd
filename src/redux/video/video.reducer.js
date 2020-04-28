import produce from 'immer';
import { VIDEO_SET_PLAY, VIDEO_SET_PAUSE, VIDEO_PAUSED_VIA_SOCKET, VIDEO_PLAYED_VIA_SOCKET, FETCH_TOP_VIDEOS_SUCCESS } from './video.types';
import { ADD_VIDEO, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST } from '../playlist/playlist.types';
import { VIDEO_ADDED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET } from '../socket/socket.types';

const initialState = {
	isPlaying: false,
	allVideos: {
		'WUcXQ--yGWQ': {
			id: 'WUcXQ--yGWQ',
			title: 'MØ - Final Song (Official Video)',
			thumbnailUrl: 'https://i.ytimg.com/vi/WUcXQ--yGWQ/default.jpg',
			channelName: 'MOMOMOYOUTHVEVO'
		},
		'sZfZ8uWaOFI': {
			id: 'sZfZ8uWaOFI',
			title: 'Aerosmith - Dream On',
			thumbnailUrl: 'https://i.ytimg.com/vi/sZfZ8uWaOFI/default.jpg',
			channelName: 'AerosmithVEVO'
		},
		'GbpnAGajyMc': {
			id: 'GbpnAGajyMc',
			title: 'Come On Eileen',
			thumbnailUrl: 'https://i.ytimg.com/vi/GbpnAGajyMc/default.jpg',
			channelName: 'Dexy\'s Midnight Runners - Topic'
		}
	}
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case FETCH_TOP_VIDEOS_SUCCESS: {
				draft.allVideos = payload.videos;
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
				const { videoId } = payload;
				delete draft.allVideos[videoId];
				
				break;
			}

			default:
				return draft;
		}
	});
}