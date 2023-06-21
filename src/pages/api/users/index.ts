// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, isDifferentEmail } from "../../../services/createUser";
import { User } from "../../../model/User";
import { CustomQuery } from "../../../model/custom";

interface QueryParams {
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const data = req.body as User;
    const sameEmail = await isDifferentEmail(data.email);
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
    const { email } = req.query as CustomQuery;
    const sameEmail = await isDifferentEmail(email);
    console.log(email);
    return res.status(200).json({
      status: `${
        sameEmail.docs.length === 0 ? "success" : "email ja cadastro"
      }`,
    });
  }
}
