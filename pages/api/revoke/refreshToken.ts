import type { NextApiRequest, NextApiResponse } from "next";

export default function revokeRefreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("set-cookie", `refresh=; path=/; samesite=lax; httponly;`);
  res.status(200);
}
