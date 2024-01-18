// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-868d1.firebaseapp.com",
  projectId: "mern-estate-868d1",
  storageBucket: "mern-estate-868d1.appspot.com",
  messagingSenderId: "90246836091",
  appId: "1:90246836091:web:fbcffc391cd6689e1757de"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);