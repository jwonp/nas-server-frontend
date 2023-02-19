import { useRouter } from "next/router";
import { useEffect } from "react";
import { getTestToken, getTokensByCode } from "../components/tools/requests";
import axios from "axios";
import qs from "qs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Home = ({
  access_token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady === true) {
      console.log("access_token is ", access_token);
      const { code } = router.query;
      if (code) {
        getTokensByCode(code, (res: any) => {
          // getTestToken(res.data).then((res: any) => {
          //   console.log(res.data);
          // });
          window.localStorage.setItem("access_token", res.data.access_token);
          router.push("/storage");
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div>
      <div>
        <h3>즐겨찾기</h3>
        <div>
          <a href="/test/authorizationview">test</a>
        </div>
      </div>
      <div>
        <h3>최근 열어본 파일</h3>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<{
  access_token: string;
}> = async (context) => {
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

  const { access_token, expires_in, token_type, scope, refresh_token } =
    res.data;
  return { props: { access_token: access_token } };
};

export default Home;
