import axios from "axios";
import { resolve4 } from "dns/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { RefreshExpiredToken } from "../../../components/tools/httpClient";

export default async function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await axios
    .post(
      "https://api.ikiningyou.com/users/o/refresh/",
      {
        "grant_type": "refresh_token",
        "refresh_token": req.cookies.refresh,
        "client_id": process.env.NEXT_PUBLIC_CLIENT_ID,
        "client_secret": process.env.NEXT_PUBLIC_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          withCredentials: true,
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    });
  res.status(200).end();
}
