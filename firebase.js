// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByzLUr1aKZ7E8IC4muXZvog2RTLlnf_Dc",
  authDomain: "acces-ff85a.firebaseapp.com",
  databaseURL: "https://acces-ff85a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "acces-ff85a",
  storageBucket: "acces-ff85a.appspot.com",
  messagingSenderId: "384900630593",
  appId: "1:384900630593:web:deac90827dcd1529bf1ec0",
  measurementId: "G-NWJ435C7G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export const todosRef = ref(database, "todos")