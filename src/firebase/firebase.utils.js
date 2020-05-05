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

const convertSnapshotToMap = collectionSnapshot => {
	const mappedCollection = {};
	
	collectionSnapshot.docs.forEach(doc => {
		const document = doc.data();

		mappedCollection[doc.id] = document;
	});

	return mappedCollection;
}

const convertSnapshotToArray = snapshot => {
	const dataArray = [];
	
	snapshot.docs.forEach(doc => {
		const document = doc.data();

		dataArray.push(document);
	});

	return dataArray;
}

const getDocumentsArrayByIds = async (collectionKey, ids) => {
	const collectionRef = firestore.collection(collectionKey);
	const promises = ids.map(id => {
		return collectionRef.doc(id).get().then(snapshot => snapshot.data());
	});
	const dataArray = await Promise.all(promises);
	return dataArray;
}

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	if (Array.isArray(objectsToAdd)) {
		objectsToAdd.forEach(obj => {
			const newDocRef = obj.id ? collectionRef.doc(obj.id) : collectionRef.doc();
			batch.set(newDocRef, obj, {merge: true});
		});
	} else {
		Object.keys(objectsToAdd).forEach(key => {
			const obj = objectsToAdd[key];
			const newDocRef = obj.id ? collectionRef.doc(obj.id) : collectionRef.doc();
			batch.set(newDocRef, obj, {merge: true});
		});
	}

	return batch.commit();
}

export const addDocument = async (collectionKey, objectToAdd) => {
	const docRef = firestore.collection(collectionKey).doc();
	const doc = {
		...objectToAdd,
		id: docRef.id
	}
	await docRef.set(doc, {merge: true});
	
	return doc;
}

export const updateDocument = (collectionKey, objectToUpdate) => {
	const collectionRef = firestore.collection(collectionKey);
	const docRef = collectionRef.doc(objectToUpdate.id);
	return docRef.set(objectToUpdate, {merge: true});
}

export const getPlaylist = async playlistId => {
	const playlistRef = firestore.collection('playlists').doc(playlistId);
	const snapshot = await playlistRef.get();
	return snapshot.data();
}

export const getVideosByIds = async ids => {
	return getDocumentsArrayByIds('videos', ids);
}

export const getTopVideos = async numberOfVideos => {
	const videosRef = firestore.collection('videos');
	const snapshot = await videosRef.orderBy('likesCount', 'desc').limit(numberOfVideos).get();
	const videosArray = convertSnapshotToArray(snapshot);
	return videosArray;
}

export const getCollectionMap = async collectionKey => {
	const collectionRef = firestore.collection(collectionKey);
	const snapshot = await collectionRef.get();
	const collectionMap = convertSnapshotToMap(snapshot);
	return collectionMap;
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

export const addVideoToPlaylist = (playlistId, video) => {
	const videoPlaylistObject = {
		id: video.id,
		addedBy: video.addedBy,
		timestampAdded: video.timestampAdded,
		likedBy: {}
	};

	const batch = firestore.batch();
	
	const videoDocRef = firestore.collection('videos').doc(video.id);
	batch.set(videoDocRef, video, {merge: true});

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