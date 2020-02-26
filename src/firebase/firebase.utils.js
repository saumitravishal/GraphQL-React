import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBUL8r-JrLfBOOpFjbPXiXKQQVnULBRcvA",
  authDomain: "crwn-db-fdf29.firebaseapp.com",
  databaseURL: "https://crwn-db-fdf29.firebaseio.com",
  projectId: "crwn-db-fdf29",
  storageBucket: "crwn-db-fdf29.appspot.com",
  messagingSenderId: "842894252941",
  appId: "1:842894252941:web:d05e0fb586950c63ebbbc4",
  measurementId: "G-4K77D49JTX"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
