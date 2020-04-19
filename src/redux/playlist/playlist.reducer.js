import produce from 'immer';
import { SET_CURRENT_PLAYLIST, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, TOGGLE_LIKE } from './playlist.types';

const initialState = {
	playlists: {
		'1': {
			id: '1',
			name: 'My Playlist',
			author: 'Tim Janzelj',
			videos: {
				byId: {
					'WUcXQ--yGWQ': {
						id: 'WUcXQ--yGWQ',
						title: 'MØ - Final Song (Official Video)',
						thumbnailUrl: 'https://i.ytimg.com/vi/WUcXQ--yGWQ/default.jpg',
						channelName: 'MOMOMOYOUTHVEVO',
						addedBy: 'Tim Janzelj',
						likedBy: {
							'23': true
						}
					}
				},
				orderedIds: ['WUcXQ--yGWQ']
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
			case TOGGLE_LIKE: {
				const { videoId } = payload;
				const currentPlaylist = draft.playlists[state.currentPlaylistId];
				const video = currentPlaylist.videos.byId[videoId];
				const isLiked = video.likedBy[userState.currentUser.id];
				isLiked ? delete video.likedBy[userState.currentUser.id] : video.likedBy[userState.currentUser.id] = true;
				break;
			}

			default:
				return draft;
		}
	});
}