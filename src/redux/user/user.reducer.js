import produce from 'immer';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT_FAILURE, SIGN_OUT_SUCCESS, CHECK_USER_SESSION_START, CHECK_USER_SESSION_END } from './user.types';

const initialState = {
	currentUser: null,
	isCheckingSession: true,
	error: null
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			case CHECK_USER_SESSION_START: {
				draft.isCheckingSession = true;
				break;
			}

			case CHECK_USER_SESSION_END: {
				draft.isCheckingSession = false;
				break;
			}

			case SIGN_IN_SUCCESS: {
				draft.currentUser = payload.user;
				draft.isCheckingSession = false;
				break;
			}

			case SIGN_OUT_SUCCESS: {
				draft.currentUser = null;
				break;
			}

			case SIGN_IN_FAILURE:
			case SIGN_OUT_FAILURE: {
				draft.error = payload;
				draft.isCheckingSession = false;
				break;
			}

			default:
				return draft;
		}
	});
}