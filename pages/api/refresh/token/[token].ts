import type { NextApiRequest, NextApiResponse } from "next";

export default function callbackRefreshToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!Object.hasOwn(req.query, "token")) res.status(403);
  if (req.body.token === "") res.status(400);
  const { token } = req.query;

  res.setHeader(
    "set-cookie",
    `refresh=${token}; path=/; samesite=lax; httponly;`
  );
  res.status(200).end(`${token} is on Cookie`);
}
