import { User } from "../model/User";
import { firestore } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function createUser({ email, password, username }: User) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firestore, "users"), {
    username,
    password,
    email,
  });
  return docRef;
}
