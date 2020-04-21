import produce from 'immer';
import { SET_CURRENT_PLAYLIST, ADD_VIDEO_TO_CURRENT_PLAYLIST, REMOVE_VIDEO_FROM_CURRENT_PLAYLIST, TOGGLE_LIKE, LIKE_TOGGLED_VIA_SOCKET, VIDEO_ADDED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET } from './playlist.types';

const initialState = {
	playlists: {
		'1': {
			id: '1',
			name: 'My Playlist',
			image: 'chill.jpg',
			author: 'Tim Janzelj',
			videos: {
				byId: {
					'cWuvnc6u93A': {
						id: 'cWuvnc6u93A',
						title: 'MØ - Final Song (Official Video)',
						thumbnailUrl: 'https://i.ytimg.com/vi/cWuvnc6u93A/default.jpg',
						channelName: 'MOMOMOYOUTHVEVO',
						addedBy: 'Tim Janzelj',
						likedBy: {
							'23': true
						}
					},
					'sZfZ8uWaOFI': {
						id:'sZfZ8uWaOFI',
						title:'Aerosmith - Dream On',
						thumbnailUrl:'https://i.ytimg.com/vi/sZfZ8uWaOFI/default.jpg',
						channelName:'AerosmithVEVO',
						addedBy:'Tim Janzelj',
						likedBy: {}
					},
					'GbpnAGajyMc': {
						id: 'GbpnAGajyMc',
						title: 'Come On Eileen',
						thumbnailUrl: 'https://i.ytimg.com/vi/GbpnAGajyMc/default.jpg',
						channelName: 'Dexy\'s Midnight Runners - Topic',
						addedBy: 'Tim Janzelj',
						likedBy: {}
					}
				},
				orderedIds: ['cWuvnc6u93A', 'sZfZ8uWaOFI', 'GbpnAGajyMc']
			}
		},
		'2': {
			id: '2',
			name: 'nekineki',
			image: 'night.jpg',
			author: 'Tim Janzelj',
			videos: {
				byId: {
					'sZfZ8uWaOFI': {
						id:'sZfZ8uWaOFI',
						title:'Aerosmith - Dream On',
						thumbnailUrl:'https://i.ytimg.com/vi/sZfZ8uWaOFI/default.jpg',
						channelName:'AerosmithVEVO',
						addedBy:'Tim Janzelj',
						likedBy: {}
					}
				},
				orderedIds: ['sZfZ8uWaOFI']
			}
		}
	},
	currentPlaylistId: null
}

export default (state = initialState, { type, payload }, userState) => {
	return produce(state, draft => {
		switch (type) {

			case ADD_VIDEO_TO_CURRENT_PLAYLIST:
			case VIDEO_ADDED_VIA_SOCKET: {
				const { video } = payload;
				const videoObject = {
					...video,
					addedBy: userState.currentUser.name,
					likedBy: {}
				};
				const playlistToUpdate = draft.playlists[state.currentPlaylistId];

				playlistToUpdate.videos.byId[video.id] = videoObject;
				playlistToUpdate.videos.orderedIds.push(video.id);
				break;
			}

			case REMOVE_VIDEO_FROM_CURRENT_PLAYLIST:
			case VIDEO_REMOVED_VIA_SOCKET: {
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

			case TOGGLE_LIKE:
			case LIKE_TOGGLED_VIA_SOCKET: {
				const { videoId } = payload;
				const currentPlaylist = draft.playlists[state.currentPlaylistId];
				const video = currentPlaylist.videos.byId[videoId];
				const isLiked = video.likedBy[userState.currentUser.id];
				isLiked ? delete video.likedBy[userState.currentUser.id] : video.likedBy[userState.currentUser.id] = true;

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