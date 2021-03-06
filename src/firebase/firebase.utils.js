import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCpx4aI-ke5jZ-v8OxzIOK9MH14V7Eyh90",
  authDomain: "react-clothing-store-c2cef.firebaseapp.com",
  databaseURL: "https://react-clothing-store-c2cef.firebaseio.com",
  projectId: "react-clothing-store-c2cef",
  storageBucket: "",
  messagingSenderId: "687163357868",
  appId: "1:687163357868:web:53a21b8f9f2b77c5ad3d09"
};

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
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
