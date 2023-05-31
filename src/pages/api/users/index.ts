// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG6Jm12DuNUzKpb-Kny7HD-74qxpaVECg",
  authDomain: "usears-cff63.firebaseapp.com",
  projectId: "usears-cff63",
  storageBucket: "usears-cff63.appspot.com",
  messagingSenderId: "1029653940359",
  appId: "1:1029653940359:web:8c381befd6c3ecb3b71022",
  measurementId: "G-1YRYD8KWYR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

type Data<T> = {
  id: number;
  username: T;
  password: T;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<string>[]>
) {
  const data = [
    {
      id: 1,
      username: "Pascoal Kahamba",
      password: "Kahamba941900324",
    },
  ];
  return res.status(200).json(data);
}
