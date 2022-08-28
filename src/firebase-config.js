import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/auth";
import { getAuth } from 'firebase/auth';
require('dotenv').config();

const firebaseConfig = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "fir-authentication-a283f.firebaseapp.com",
    projectId: "fir-authentication-a283f",
    storageBucket: "fir-authentication-a283f.appspot.com",
    messagingSenderId: "996015472040",
    appId: "1:996015472040:web:39edc3ac5ddfda7b7db19d",
    measurementId: "G-ZSY1GFXZNQ"
});

const auth = getAuth(firebaseConfig);
export { auth };
export default firebaseConfig;