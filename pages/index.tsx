import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

const Home = ({ access_token, refresh_token }) => {
  useEffect(() => {
    const isAccessToken =
      window.localStorage.getItem("access_token") === undefined ? true : false;
    const isRefreshToken =
      window.localStorage.getItem("refresh_token") === undefined ? true : false;
    console.log(window.localStorage.getItem("access_token"));
    console.log(
      "isAccessToken",
      isAccessToken,
      "isRefreshToken",
      isRefreshToken
    );
    if (!isAccessToken && !isRefreshToken) {
      window.localStorage.setItem("access_token", access_token);
      window.localStorage.setItem("refresh_token", refresh_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${window.localStorage.getItem("access_token")}`;
    }
  }, []);

  const validtoken = async () => {
    await axios.get("/test/validtoken").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <div
        onClick={() => {
          validtoken();
        }}
      >
        <h1>환영합니다</h1>
      </div>
      <div>
        <h3>즐겨찾기</h3>
        <div>
          <a href="/test/authorizationview">test</a>
        </div>
      </div>
      <div>
        <h3>최근 열어본 파일</h3>
        <div></div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.code) {
    const res = await axios.post(`http://127.0.0.1:8000/login/`, {
      code: context.query.code,
    });

    return { props: res.data };
  }
  return { props: { token: "no" } };
};
export default Home;
