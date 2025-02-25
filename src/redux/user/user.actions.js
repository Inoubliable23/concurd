import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE, GOOGLE_SIGN_IN, CHECK_USER_SESSION, CHECK_USER_SESSION_START, CHECK_USER_SESSION_END } from './user.types';

export const checkingSessionStart = () => ({
	type: CHECK_USER_SESSION_START
});

export const checkingSessionEnd = () => ({
	type: CHECK_USER_SESSION_END
});

export const googleSignIn = () => ({
	type: GOOGLE_SIGN_IN
});

export const signInSuccess = payload => ({
	type: SIGN_IN_SUCCESS,
	payload
});

export const signInFailure = error => ({
	type: SIGN_IN_FAILURE,
	payload: error
});

export const signOut = () => ({
	type: SIGN_OUT
});

export const signOutSuccess = () => ({
	type: SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
	type: SIGN_OUT_FAILURE,
	payload: error
});

export const checkUserSession = () => ({
	type: CHECK_USER_SESSION
});