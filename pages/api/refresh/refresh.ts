import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { RefreshExpiredToken } from "../../../components/tools/httpClient";

export default function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  RefreshExpiredToken();
  res.status(200).end("refresh the token");
}
