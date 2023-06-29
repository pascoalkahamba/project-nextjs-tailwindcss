// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  funCreateUser,
  funIsDifferentEmail,
  funUpDataUser,
} from "../../../services/createUser";
import { User } from "../../../model/User";
import { CustomQuery } from "../../../model/custom";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const data = req.body as User;
    const sameEmail = await funIsDifferentEmail(data.email);
    if (sameEmail.docs.length === 0) {
      await funCreateUser(data);
      return res.status(200).json({ status: "success" });
    } else {
      sameEmail.docs.forEach(async (doc) => {
        await funUpDataUser(data.password, doc.id);
      });
      console.log("Email ja cadastro");
      return res.status(200).json({ status: "email ja cadastrado." });
    }
  }
  if (method === "GET") {
    const { email, password } = req.query as CustomQuery;
    const sameEmail = await funIsDifferentEmail(email);
    if (sameEmail.docs.length > 0) {
      sameEmail.docs.forEach((doc) => {
        const data = doc.data() as User;
        if (password === data.password) {
          return res.status(200).json({
            status: "success",
            username: data.username,
          });
        } else {
          return res.status(200).json({
            status: "password invalid",
            username: "Login",
          });
        }
      });
    } else {
      return res.status(200).json({
        status: "email nao cadastrado",
        username: "Login",
      });
    }
  }
}
