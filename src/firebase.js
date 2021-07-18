import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBB9Nuut0VeOluNJ8wppm8jF8NxxNM-WQU",
  authDomain: "snapchat-clone-6ebc3.firebaseapp.com",
  projectId: "snapchat-clone-6ebc3",
  storageBucket: "snapchat-clone-6ebc3.appspot.com",
  messagingSenderId: "551821419544",
  appId: "1:551821419544:web:907d18923c3ba4f08a4f6d",
  measurementId: "G-8TN428ZDF0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
