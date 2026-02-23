// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCRWdtB747U9bOSjvLB6OjHrfndYaGyZpo",
    authDomain: "course-selection-platfor-977c6.firebaseapp.com",
    projectId: "course-selection-platfor-977c6",
    storageBucket: "course-selection-platfor-977c6.firebasestorage.app",
    messagingSenderId: "728961311013",
    appId: "1:728961311013:web:d9d73077e059d6d2c43acc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Firestore (for users collection / role-based access)
const db = getFirestore(app);

// Google provider (optional)
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };