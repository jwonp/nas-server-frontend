import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { RefreshExpiredToken } from "../../../components/tools/httpClient";

export default async function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await axios.post(
    "https://api.ikiningyou.com/users/o/refresh/",
    { data: "example" },
    {
      headers: {
        Cookie: `refresh=${req.cookies.refresh};`,
        withCredentials: true,
      },
    }
  );
  res.status(200).end(response.data);
}
