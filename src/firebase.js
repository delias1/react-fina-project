// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTanGDFPpimsgEEHHa-4y27SswGwcPCvQ",
  authDomain: "reactfinalproject-e176a.firebaseapp.com",
  projectId: "reactfinalproject-e176a",
  storageBucket: "reactfinalproject-e176a.appspot.com",
  messagingSenderId: "339566548270",
  appId: "1:339566548270:web:ecd27f828c2112a94f56bf",
  measurementId: "G-6EZ01GH3NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;