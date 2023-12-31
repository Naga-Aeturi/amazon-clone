import firebase from 'firebase/app'
import 'firebase/firestore'
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyAJ8-ASR5SfX91NsFJ5WQT5tOhJl43iiyU",
  authDomain: "clone-96e62.firebaseapp.com",
  projectId: "clone-96e62",
  storageBucket: "clone-96e62.appspot.com",
  messagingSenderId: "58093445337",
  appId: "1:58093445337:web:1014c0f584fa145c4edec8",
  measurementId: "G-CSTDZTFPXM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };