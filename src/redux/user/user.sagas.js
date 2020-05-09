import { takeLatest, put, all, call } from 'redux-saga/effects';
import { signInWithGoogle, signOut, getOrCreateUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { SIGN_OUT, GOOGLE_SIGN_IN, CHECK_USER_SESSION } from './user.types';
import { signInSuccess, signOutFailure, signOutSuccess, signInFailure } from './user.actions';

function* onGoogleSignInStart() {
	yield takeLatest(GOOGLE_SIGN_IN, googleSignIn);
}

function* onSignOutStart() {
	yield takeLatest(SIGN_OUT, signOutAsync);
}

function* onCheckUserSession() {
	yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

function* googleSignIn() {
	try {
		const { user } = yield signInWithGoogle();
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield getOrCreateUserProfileDocument(userAuth, additionalData);
		const snapshot = yield userRef.get();

		yield put(
			signInSuccess({
				user: {
					id: snapshot.id,
					...snapshot.data()
				}
			})
		);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

function* signOutAsync() {
	try {
		yield signOut();
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onSignOutStart),
		call(onCheckUserSession)
	]);
}