import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import { revokeAccessToken } from "../../../components/tools/requests";

export default function revokeTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!Object.hasOwn(req.query, "token")) res.status(403);
  if (req.body.token === "") res.status(400);
  const { token } = req.query;
  revokeAccessToken(token as string, () => {});
  // fetch("https://api.ikiningyou.com/users/o/revoke-token/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Cache-Control": "no-cache",
  //   },
  //   body: qs.stringify({
  //     token: req.body.token,
  //     client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  //   }),
  // });

  res.status(200).end(`access token - ${token} is expired`);
}
