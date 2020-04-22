import { CONNECT_TO_SOCKET, VIDEO_ADDED_VIA_SOCKET, VIDEO_REMOVED_VIA_SOCKET, LIKE_TOGGLED_VIA_SOCKET } from './socket.types';

export const connectToSocket = payload => ({
	type: CONNECT_TO_SOCKET,
	payload
});

export const videoAddedViaSocket = payload => ({
	type: VIDEO_ADDED_VIA_SOCKET,
	payload
});

export const videoRemovedViaSocket = payload => ({
	type: VIDEO_REMOVED_VIA_SOCKET,
	payload
});

export const likeToggledViaSocket = payload => ({
	type: LIKE_TOGGLED_VIA_SOCKET,
	payload
});