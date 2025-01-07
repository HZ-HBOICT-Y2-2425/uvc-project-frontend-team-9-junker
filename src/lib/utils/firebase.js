// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJJzJkRPNwCg3iZgpVzqOfpaJnWQ66drI",
  authDomain: "junker-communication.firebaseapp.com",
  databaseURL: "https://junker-communication-default-rtdb.firebaseio.com",
  projectId: "junker-communication",
  storageBucket: "junker-communication.firebasestorage.app",
  messagingSenderId: "198277380818",
  appId: "1:198277380818:web:bf4bea9004effc41ce0b0b",
  measurementId: "G-MQ1WK48VBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);