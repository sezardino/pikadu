import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {IUser} from '../const/';

// TODO: Add SDKs for Firebase products that you want to use
//      `https://firebase.google.com/docs/web/setup#available-libraries` -->

const firebaseConfig = {
	apiKey: 'AIzaSyCiP2mEyfKmVqn5O-J4MIhouhRS5NVzH3k',
	authDomain: 'pika-10ab6.firebaseapp.com',
	projectId: 'pika-10ab6',
	storageBucket: 'pika-10ab6.appspot.com',
	messagingSenderId: '829559173312',
	appId: '1:829559173312:web:4e7b8f7dcc554c2a587d25',
};

firebase.initializeApp(firebaseConfig);

const registration = (email: string, password: string, handler: () => void): void => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			handler();
		})
		.catch((error) => {
			alert(error);
		});
};

const logIn = (email: string, password: string): void => {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {})
		.catch((error) => alert(error));
};

const authListener = (context: IUser, handler): void => {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			context.user = user;
			handler();
		} else {
			context.user = null;
			handler();
		}
	});
};

const logOut = () => {
	firebase
		.auth()
		.signOut()
		.catch((error) => {
			alert(error);
		});
};

const updateUserData = (displayName: string, photoURL: string, handler: () => void) => {
	const user = firebase.auth().currentUser;
	user
		.updateProfile({
			displayName,
			photoURL,
		})
		.then(() => {
			handler();
		})
		.catch((error) => {
			alert(error);
		});
};

export {registration, logIn, authListener, logOut, updateUserData};
