// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore as noLiteFireStore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

//get firebaseConfig from .env

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// get firebaseConfig from .env
const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID
}

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireAuth = getAuth(app);

// console.log(firebaseConfig);
export const db = getFirestore(app);
export const noLiteDb = noLiteFireStore(app);
export const storage = getStorage(app);

export const auth = fireAuth;

