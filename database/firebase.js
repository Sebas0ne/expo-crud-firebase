import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCjrnNqKjWrzOCLMBaX6n7_jRvrJpCZeFU",
  authDomain: "crud-firebase-e5b7f.firebaseapp.com",
  projectId: "crud-firebase-e5b7f",
  storageBucket: "crud-firebase-e5b7f.appspot.com",
  messagingSenderId: "447080879878",
  appId: "1:447080879878:web:1a64e6b2834502aeaef087",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
