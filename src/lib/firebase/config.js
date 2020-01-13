import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey            : 'AIzaSyAy-IGDzLCtt7FU3Xot_AT4qSDSfgjfZkI',
	authDomain        : 'fid-access-replacement.firebaseapp.com',
	databaseURL       : 'https://fid-access-replacement.firebaseio.com',
	projectId         : 'fid-access-replacement',
	storageBucket     : 'fid-access-replacement.appspot.com',
	messagingSenderId : '658486908390'
};

if ( !firebase.apps.length ) {
	firebase.initializeApp( firebaseConfig );
}

export default firebase;
