import { User } from "../model/User";
import { firestore } from "../config/firebase";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";

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
