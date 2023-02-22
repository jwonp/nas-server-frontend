import type { NextApiRequest, NextApiResponse } from "next";
import { revokeAccessToken } from "../../../components/tools/requests";

export default function revokeTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!Object.hasOwn(req.query, "token")) res.status(403);
  if (req.body.token === "") res.status(400);
  const { token } = req.query;
  revokeAccessToken(token as string, () => {});
  res.status(200).end(`access token - ${token} is expired`);
}
