import Image from "next/image";
import icon from "../public/vercel.svg";
import styles from "../styles/Navigator.module.css";
import DrawerStyles from "../styles/Drawer.module.css";

import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

import { authorizeToken } from "./tools/fetcher";
import { useEffect } from "react";

const Navigator = ({ refresh_token }) => {
  const router = useRouter();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/test/validtoken",
    authorizeToken,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  useEffect(() => {
    if (data && data.name) {
      window.localStorage.setItem("name", data.name);
    }
  }, [data]);
  const refs = router.query.ref as string[];

  const visibleDrawer = () => {
    const drawer = document.getElementById("drawer") as HTMLDivElement;
    drawer.classList.contains(DrawerStyles.fixed_visible)
      ? drawer.classList.toggle(DrawerStyles.fixed_visible, false)
      : drawer.classList.toggle(DrawerStyles.fixed_visible, true);
  };

  const revokeToken = async () => {
    const revokeData = {
      name: window.localStorage.getItem("name"),
      token: window.localStorage.getItem("access_token"),
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    };

    await axios({
      method: "POST",
      url: "/test/logout",
      data: revokeData,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": document.cookie.split("=")[1],
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("refresh_token");
          window.localStorage.removeItem("name");

          mutate({ name: null });
          // console.log(data);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={`${styles.wrapper}`}>
      <Link href={"/"}>
        <div className={`${styles.logo}`}>
          <Image src={icon} width={45} height={45} alt={"No image"} />
        </div>
      </Link>

      <Link href={"/register"}>
        <div className={`${styles.title} ${styles.float_left}`}>
          회원가입 페이지
        </div>
      </Link>

      <div className={`${styles.title} ${styles.float_left}`}>
        {refs?.join(" > ")}
      </div>

      <div
        className={`${styles.drawer_button} ${styles.float_right}`}
        onClick={() => {
          visibleDrawer();
        }}
      >
        OPEN
      </div>
      {data && data?.name ? (
        <div className={`${styles.title} ${styles.float_left}`}>
          {data.name}
        </div>
      ) : (
        <></>
      )}
      {data && data.name ? (
        <div
          className={`${styles.title} ${styles.cursor_click} ${styles.float_right}`}
          onClick={() => {
            revokeToken();
          }}
        >
          로그아웃
        </div>
      ) : (
        <Link href={"/login"}>
          <div className={`${styles.title} ${styles.float_right}`}>로그인</div>
        </Link>
      )}
    </div>
  );
};

export default Navigator;
