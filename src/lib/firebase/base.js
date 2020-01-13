import firebase from '@/lib/firebase/config';

const auth      = firebase.auth();
const firestore = firebase.firestore();

const db         = firebase.database().ref( '/' );
const FirebaseKey = () => db.push().key;

export {
	firebase,
	auth,
	firestore,
	db,
	FirebaseKey,
};
