// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, differentEmail } from "../../../services/createUser";
import { User } from "../../../model/User";

interface WriteNewUserProps<T> {
  userId: number;
  email: T;
  username: T;
  password: T;
}

type Data<T> = {
  id: number;
  username: T;
  password: T;
};

// Initialize Firebase

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const data = req.body as User;
    const sameEmail = await differentEmail(data.email);
    if (sameEmail.docs.length === 0) {
      await createUser(data);
      return res.status(200).json({ status: "success" });
    } else {
      console.log("Email ja cadastrado.");
      return res.status(400).json({ error: "email já cadastrado." });
    }
  }
  if (method === "GET") {
  }
  const data = [
    {
      id: 1,
      username: "Pascoal Kahamba",
      password: "Kahamba941900324",
    },
  ];
}
