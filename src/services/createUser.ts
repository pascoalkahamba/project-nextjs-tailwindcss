import { User } from "../model/User";
import { firestore } from "../config/firebase";
import {
  collection,
  addDoc,
  where,
  getDocs,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function createUser({ email, password, username }: User) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firestore, "users"), {
    username,
    password,
    email,
  });
  return docRef;
}

export async function isDifferentEmail(email: string) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

export async function upDataUser(password: string) {
  // Add a new document with a generated id.
  const docRef = doc(firestore, "users");
  await updateDoc(docRef, {
    password,
  });
}
