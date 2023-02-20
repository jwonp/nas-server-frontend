import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { revokeAccessToken } from "../../components/tools/requests";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!Object.hasOwn(req.body, "token")) res.status(403);
  revokeAccessToken(req.body.token, (response) => {
    res.status(200);
  });
}
