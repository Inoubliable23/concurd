import produce from 'immer';
import { SET_CURRENT_PLAYLIST, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST } from './playlist.types';

const initialState = {
	playlists: {
		'1': {
			id: '1',
			name: 'My Playlist',
			videos: {
				byId: {},
				orderedIds: []
			}
		}
	},
	currentPlaylistId: null
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case ADD_VIDEO_TO_CURRENT_PLAYLIST: {
				const { video } = payload;
				video.addedBy = 'unknown';
				const playlistToUpdate = draft.playlists[state.currentPlaylistId];

				playlistToUpdate.videos.byId[video.id] = video;
				playlistToUpdate.videos.orderedIds.push(video.id);
				break;
			}
			case REMOVE_VIDEO_FROM_CURRENT_PLAYLIST: {
				const { videoId } = payload;
				const playlist = draft.playlists[state.currentPlaylistId];
				const index = playlist.videos.orderedIds.indexOf(videoId);
				
				if (index > -1) {
					playlist.videos.orderedIds.splice(index, 1);
				}
				delete playlist.videos.byId[videoId];
				break;
			}
			case SET_CURRENT_PLAYLIST: {
				draft.currentPlaylistId = payload.playlistId;
				break;
			}

			default:
				return draft;
		}
	});
}