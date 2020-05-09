import produce from 'immer';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT_FAILURE, SIGN_OUT_SUCCESS } from './user.types';

const initialState = {
	currentUser: null,
	error: null
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case SIGN_IN_SUCCESS: {
				draft.currentUser = payload.user;
				break;
			}

			case SIGN_OUT_SUCCESS: {
				draft.currentUser = null;
				break;
			}

			case SIGN_IN_FAILURE:
			case SIGN_OUT_FAILURE:
				return {
					...state,
					error: payload
				};

			default:
				return draft;
		}
	});
}