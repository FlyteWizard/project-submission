// Firebase
import firebase from 'firebase'
// Config Variables
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
// Initialize Firebase
firebase.initializeApp(config);
// Google Authentication
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
// Export Firebase
export default firebase;
