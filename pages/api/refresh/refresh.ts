import axios from "axios";
import { resolve4 } from "dns/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { RefreshExpiredToken } from "../../../components/tools/httpClient";

export default async function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await axios
  //   .post(
  //     "https://api.ikiningyou.com/users/o/refresh/",
  //     { data: "data" },
  //     {
  //       headers: {
  //         'set-cookie': `refresh=${req.cookies.refresh}`,
  //         withCredentials: true,
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     res.status(200).end(response.data);
  //   });
  res.status(200).end(req.cookies.refresh);
}
