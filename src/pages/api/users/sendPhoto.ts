// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PictureProps } from "../../../model/User";
import { sendPhotos } from "../../../services/createUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const data = req.body as PictureProps;
    await sendPhotos(data);
    return res.status(200).json({ status: "success" });
  }
  if (method === "GET") {
    console.log("All pictures");
    return res.status(200).json({ response: "All pictures" });
  }
}
