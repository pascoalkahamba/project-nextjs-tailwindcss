import { PictureProps, User } from "../model/User";
import { firestore, storage } from "../config/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import {
  collection,
  addDoc,
  where,
  getDocs,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function funCreateUser({ email, password, username }: User) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firestore, "users"), {
    username,
    password,
    email,
  });
  return docRef;
}

export async function funIsDifferentEmail(email: string) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

export async function funUpDataUser(password: string, idRef: string) {
  // Add a new document with a generated id.
  const docRef = doc(firestore, "users", idRef);
  await updateDoc(docRef, {
    password,
  });
  return docRef;
}

export async function sendPhotos({ preview, file }: PictureProps) {
  const storageRef = ref(storage, preview);

  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);
}
