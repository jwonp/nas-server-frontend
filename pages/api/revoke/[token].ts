import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import { revokeAccessToken } from "../../../components/tools/requests";

export default function revokeTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   url ='https://api.ikiningyou.com/users/o/token/'
  //   data={
  //       "grant_type":"refresh_token",
  //       "refresh_token":refresh_token,
  //       "client_id":settings.AUTH_DATA['CLIENT_ID'],
  //       "client_secret":settings.AUTH_DATA['CLIENT_SECRET']
  //   }
  //   headers={'Content-type':'application/x-www-form-urlencoded',"Cache-Control": "no-cache"}
}
