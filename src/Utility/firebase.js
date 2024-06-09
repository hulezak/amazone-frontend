// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import'firebase/compat/auth'
import'firebase/compat/firestore'


// import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUYA1P6Q4q-3XPQZH51iJbYBRTf-BLUfo",
  authDomain: "fir-2675c.firebaseapp.com",
  projectId: "fir-2675c",
  storageBucket: "fir-2675c.appspot.com",
  messagingSenderId: "385894647345",
  appId: "1:385894647345:web:d2b7bba5c872046458f710"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = app.firestore();

