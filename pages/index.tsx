import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { setRefreshOnCookie } from "../components/tools/requests";

const Home = ({
  access_token,
  refresh_token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady === true) {
      if (refresh_token !== "") {
        setRefreshOnCookie(refresh_token, (res) => {});
      }
      if (access_token !== "") {
        window.localStorage.setItem("access_token", access_token);
        router.push("/storage/내_드라이브");
      } else {
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return <div></div>;
};
export const getServerSideProps: GetServerSideProps<{
  access_token: string;
  refresh_token: string;
}> = async (context) => {
  if (Object.hasOwn(context.query, "code") === false)
    return { props: { access_token: "", refresh_token: "" } };
  const data = {
    "client_id": process.env.NEXT_PUBLIC_CLIENT_ID,
    "client_secret": process.env.NEXT_PUBLIC_CLIENT_SECRET,
    "code": context.query.code,
    "code_verifier": process.env.NEXT_PUBLIC_CODE_VERIFIER,
    "redirect_uri": "https://www.ikiningyou.com/",
    "grant_type": "authorization_code",
  };
  const header = {
    "Content-type": "application/x-www-form-urlencoded",
    "Cache-Control": "no-cache",
  };
  const res = await axios.post(
    "https://api.ikiningyou.com/users/o/token/",
    qs.stringify(data),
    {
      headers: header,
    }
  );
  // const { access_token, expires_in, token_type, scope, refresh_token } =
  const { access_token, refresh_token } = res.data;
  //
  return {
    props: { access_token: access_token, refresh_token: refresh_token },
  };
};

export default Home;
