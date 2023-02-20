import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { RefreshExpiredToken } from "../../../components/tools/httpClient";

export default async function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = fetch("https://api.ikiningyou.com/users/o/refresh/", {
    body: JSON.stringify({ data: "example" }),
    method: "POST",
    credentials: "include",
    headers: {
      "set-Cookie": `refresh=${req.cookies.refresh};`,
    },
  });
  res.status(200).end((await response).body);
}
