import produce from 'immer';
import { ADD_VIDEO, REMOVE_VIDEO } from './playlist.types';

const initialState = {
	playlists: {
		'1': {
			name: 'My Playlist',
			videos: {
				byId: {
					'7wNPJJoIzP4': {
						id: '7wNPJJoIzP4',
						title: 'Kingston - Alle Alle',
						addedBy: 'Jernej Lipovec',
						imgUrl: 'https://img.youtube.com/vi/Uvt3DIgxNsc/0.jpg'
					},
					'2': {
						id: '2',
						title: 'Nipke - Všeč tko k je',
						addedBy: 'Tim Janželj',
						imgUrl: 'https://img.youtube.com/vi/7wNPJJoIzP4/0.jpg'
					},
					'3': {
						id: '3',
						title: 'Challe Salle - Lagano',
						addedBy: 'Jakob Makovec',
						imgUrl: 'https://img.youtube.com/vi/JaPwLN5-21o/0.jpg'
					},
					'4': {
						id: '4',
						title: 'Challe Salle - Lagano',
						addedBy: 'Jakob Makovec',
						imgUrl: 'https://img.youtube.com/vi/JaPwLN5-21o/0.jpg'
					}
				},
				orderedIds: ['7wNPJJoIzP4', '2', '3', '4']
			}
		}
	}
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case ADD_VIDEO:
				const playlistToUpdate = draft.playlists[payload.playlistId];
				if (playlistToUpdate) {
					playlistToUpdate.videos.byId[payload.video.id] = payload.video;
				}
				break;
			case REMOVE_VIDEO:
				const { playlistId, videoId } = payload;
				const playlistToDelete = draft.playlists[playlistId];
				if (playlistToDelete) {
					const index = playlistToDelete.videos.orderedIds.indexOf(videoId);
					if (index > -1) {
						playlistToDelete.videos.orderedIds.splice(index, 1);
					}
					delete draft.playlists[playlistId].videos[videoId];
				}
				break;

			default:
				return draft;
		}
	});
}