import { useRouter } from "next/router";
import { useEffect } from "react";
import { getTestToken, getTokensByCode } from "../components/tools/requests";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady === true) {
      const { code } = router.query;
      if (code) {
        getTokensByCode(code, (res: any) => {
          getTestToken(res.data).then((res: any) => {
            console.log(res.data);
          });
          // window.localStorage.setItem("access_token", res.data.access_token);
          // router.push("/");
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

export default Home;
