// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../model/User";
import { createUser } from "../../services/createUser";

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

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "POST") {
    const data = req.body as User;
    await createUser(data);

    return res.status(200).json({ status: "success" });
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
