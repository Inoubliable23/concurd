import produce from 'immer';
import { SET_CURRENT_PLAYLIST, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST } from './playlist.types';

const initialState = {
	playlists: {
		'1': {
			id: '1',
			name: 'My Playlist',
			author: 'Tim Janzelj',
			videos: {
				byId: {},
				orderedIds: []
			}
		}
	},
	currentPlaylistId: null
}

export default (state = initialState, { type, payload }, userState) => {
	return produce(state, draft => {
		switch (type) {

			case ADD_VIDEO_TO_CURRENT_PLAYLIST: {
				const { video } = payload;
				const videoObject = {
					...video,
					addedBy: userState.currentUser.name
				};
				const playlistToUpdate = draft.playlists[state.currentPlaylistId];

				playlistToUpdate.videos.byId[video.id] = videoObject;
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