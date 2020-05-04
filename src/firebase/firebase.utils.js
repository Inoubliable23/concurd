import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyBdMMUtYgCJD1mLjLkZPmeYnMunlno4W0w",
  authDomain: "concurd.firebaseapp.com",
  databaseURL: "https://concurd.firebaseio.com",
  projectId: "concurd",
  storageBucket: "concurd.appspot.com",
  messagingSenderId: "533043847177",
  appId: "1:533043847177:web:c047667e76decb54c718d8"
}

firebase.initializeApp(config);

const firestore = firebase.firestore();
const storage = firebase.storage();

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	if (Array.isArray(objectsToAdd)) {
		objectsToAdd.forEach(obj => {
			const newDocRef = obj.id ? collectionRef.doc(obj.id) : collectionRef.doc();
			batch.set(newDocRef, obj);
		});
	} else {
		Object.keys(objectsToAdd).forEach(key => {
			const obj = objectsToAdd[key];
			const newDocRef = obj.id ? collectionRef.doc(obj.id) : collectionRef.doc();
			batch.set(newDocRef, obj);
		});
	}

	return batch.commit();
}

export const addDocument = (collectionKey, objectToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	return collectionRef.add(objectToAdd);
}

export const updateDocument = (collectionKey, objectToUpdate) => {
	const collectionRef = firestore.collection(collectionKey);
	const docRef = collectionRef.doc(objectToUpdate.id);
	return docRef.set(objectToUpdate);
}

export const getTopVideos = async numberOfVideos => {
	const videosRef = firestore.collection('videos');
	const snapshot = await videosRef.orderBy('likesCount').limit(numberOfVideos).get();
	const collectionMap = convertSnapshotToMap(snapshot);
	return collectionMap;
}

export const getCollectionMap = async collectionKey => {
	const collectionRef = firestore.collection(collectionKey);
	const snapshot = await collectionRef.get();
	const collectionMap = convertSnapshotToMap(snapshot);
	return collectionMap;
}

const convertSnapshotToMap = collectionSnapshot => {
	const mappedCollection = {};
	
	collectionSnapshot.docs.forEach(doc => {
		const document = doc.data();

		mappedCollection[doc.id] = document;
	});

	return mappedCollection;
}

export const uploadPlaylistImage = async image => {
	const storageRef = storage.ref(`playlist_images/${image.name}`);
	const snapshot = await storageRef.put(image);
	return snapshot.ref.getDownloadURL();
}

export const updateVideoLikes = (playlistId, videoId, userId, like) => {

	const batch = firestore.batch();
	
	const videoDocRef = firestore.collection('videos').doc(videoId);
	batch.update(videoDocRef, {
		likesCount: like ? increment : decrement
	});

	const playlistDocRef = firestore.collection('playlists').doc(playlistId);
	batch.update(playlistDocRef, {
		[`videos.byId.${videoId}.likedBy.${userId}`]: like
	});

	return batch.commit();
}

export const addVideoToPlaylist = (playlistId, video, userId) => {
	const videoPlaylistObject = {
		id: video.id,
		addedBy: userId,
		likedBy: {}
	};

	const batch = firestore.batch();
	
	const videoDocRef = firestore.collection('videos').doc(video.id);
	batch.set(videoDocRef, video);

	const playlistDocRef = firestore.collection('playlists').doc(playlistId);
	batch.update(playlistDocRef, {
		[`videos.byId.${video.id}`]: videoPlaylistObject,
		[`videos.orderedIds`]: firebase.firestore.FieldValue.arrayUnion(video.id)
	});

	return batch.commit();
}

export const removeVideoFromPlaylist = (playlistId, videoId) => {
	return firestore.collection('playlists').doc(playlistId).update({
		[`videos.byId.${videoId}`]: firebase.firestore.FieldValue.delete(),
		[`videos.orderedIds`]: firebase.firestore.FieldValue.arrayRemove(videoId)
	});
}

export default firebase;