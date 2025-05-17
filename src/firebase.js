import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAk1KC9l3g9mEFYJt5IpmLrbafmUHtIb-I",
    authDomain: "cs-admin-frontend.firebaseapp.com",
    databaseURL: "https://cs-admin-frontend-default-rtdb.firebaseio.com",
    projectId: "cs-admin-frontend",
    storageBucket: "cs-admin-frontend.firebasestorage.app",
    messagingSenderId: "352039688643",
    appId: "1:352039688643:web:a888a26225a4e184b00576",
    measurementId: "G-58Z1ML55JD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }; 

