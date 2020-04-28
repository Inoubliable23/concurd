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

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = obj.id ? collectionRef.doc(obj.id) : collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return batch.commit();
}

export const addDocument = (collectionKey, objectToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	return collectionRef.add(objectToAdd);
}

export const updateDocument = (collectionKey, objectToUpdate) => {
	const collectionRef = firestore.collection(collectionKey);
	const newDocRef = collectionRef.doc(objectToUpdate.id);
	return newDocRef.set(objectToUpdate);
}

export const convertSnapshotToMap = collectionSnapshot => {
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

export default firebase;