// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// auth
import { getAuth } from "firebase/auth";
// database
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt9q7L2-E90SWOKt7aAOObqgoOG1D_U64",
  authDomain: "svelte-crud-6d4be.firebaseapp.com",
  projectId: "svelte-crud-6d4be",
  storageBucket: "svelte-crud-6d4be.appspot.com",
  messagingSenderId: "323261719988",
  appId: "1:323261719988:web:f1be3b5a01c6101f787ee1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export let auth = getAuth(app);
export let db = getFirestore(app);