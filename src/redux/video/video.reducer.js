import produce from 'immer';
import { VIDEO_SET_PLAY, VIDEO_SET_PAUSE, VIDEO_PAUSED_VIA_SOCKET, VIDEO_PLAYED_VIA_SOCKET } from './video.types';

const initialState = {
	isPlaying: false
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

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

			default:
				return draft;
		}
	});
}