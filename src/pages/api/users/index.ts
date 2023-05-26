// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data<T> = {
  id: number;
  username: T;
  password: T;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<string>[]>
) {
  const data = [
    {
      id: 1,
      username: "Pascoal Kahamba",
      password: "Kahamba941900324",
    },
  ];
  return res.status(200).json(data);
}
