import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { RefreshExpiredToken } from "../../../components/tools/httpClient";

export default function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  RefreshExpiredToken().then((res) => {
    const { access_token, refresh_token } = res.data;
    // res.setHeader(
    //   "set-cookie",
    //   `refresh=${refresh_token}; path=/; samesite=lax; httponly;`
    // );
    // res.status(200).json({ access_token: access_token });
    res.status(200).end("refresh the token");
  });
}
