import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

export default async function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.cookies.refresh === null || req.cookies.refresh === "")
    res.status(400);
  await axios
    .post(
      "https://api.ikiningyou.com/users/o/token/",
      qs.stringify({
        "grant_type": "refresh_token",
        "refresh_token": req.cookies.refresh,
        "client_id": process.env.NEXT_PUBLIC_CLIENT_ID,
        "client_secret": process.env.NEXT_PUBLIC_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          withCredentials: true,
        },
      }
    )
    .then((response) => {
      res.setHeader(
        "set-cookie",
        `refresh=${response.data.refresh_token}; path=/; samesite=lax; httponly;`
      );
      res.status(200).json({ access_token: response.data.access_token });
    });
  res.status(200).end();
}
