import type { NextApiRequest, NextApiResponse } from "next";

export default function revokeTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!Object.hasOwn(req.query, "token")) res.status(403);
  if (req.body.token === "") res.status(400);
  const { refresh } = req.query;

  res.setHeader(
    "set-cookie",
    `refresh=${refresh}; path=/; samesite=lax httponly;`
  );
  res.status(200);
}
