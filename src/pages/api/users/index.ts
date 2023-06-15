// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, differentEmail } from "../../../services/createUser";
import { User } from "../../../model/User";

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
      console.log("Usuario adicionado.");
      return res.status(200).json({ status: "success" });
    } else {
      console.log("Email ja cadastrado.");
      return res.status(200).json({ status: "email ja cadastrado." });
    }
  }
  if (method === "GET") {
    return res.status(200).json({
      status: "success",
    });
  }
}
