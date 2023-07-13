import firebase from "firebase/app";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBG6Jm12DuNUzKpb-Kny7HD-74qxpaVECg",
  authDomain: "usears-cff63.firebaseapp.com",
  projectId: "usears-cff63",
  storageBucket: "usears-cff63.appspot.com",
  messagingSenderId: "1029653940359",
  appId: "1:1029653940359:web:8c381befd6c3ecb3b71022",
  measurementId: "G-1YRYD8KWYR",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
// const database = firebase.database();
