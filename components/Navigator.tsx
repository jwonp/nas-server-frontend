import Image from "next/image";
import icon from "../public/vercel.svg";
import styles from "../styles/Navigator.module.css";
import DrawerStyles from "../styles/Drawer.module.css";

import { useRouter } from "next/router";
import Link from "next/link";
import { logout } from "./tools/requests";
import useSWR from "swr";
import store from "../redux/store";
import { authorizeToken } from "./tools/fetcher";
import { useEffect } from "react";
import FileHandleOptions from "./FileHandleOptions";

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
    console.log(store.getState().drawerSwitch.value);

    if (data && data.name) {
      window.localStorage.setItem("name", data.name);
    }
  }, [data]);
  const refs = router.query.ref as string[];

  const visibleDrawer = () => {
    const drawer = document.getElementById("drawer") as HTMLDivElement;
    drawer?.classList.contains(DrawerStyles.fixed_visible)
      ? drawer?.classList.toggle(DrawerStyles.fixed_visible, false)
      : drawer?.classList.toggle(DrawerStyles.fixed_visible, true);
  };

  const revokeToken = async () => {
    const revokeData = {
      name: window.localStorage.getItem("name"),
      token: window.localStorage.getItem("access_token"),
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    };

    logout(revokeData)
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.removeItem("access_token");
          window.localStorage.removeItem("refresh_token");
          window.localStorage.removeItem("name");

          mutate({ name: null });
          // console.log(data);
          router.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.grid_container}`}>
        <Link href={"/"}>
          <div className={`${styles.logo}`}>
            <Image src={icon} width={45} height={45} alt={"No image"} />
          </div>
        </Link>
        {data && data?.name ? (
          <div className={`${styles.title}`}>{data.name}</div>
        ) : (
          <></>
        )}
      </div>
      <div className={`${styles.grid_container}`}>
        <div className={`${styles.title} `}>
          {refs?.join(" > ").replace("_", " ")}
        </div>
      </div>

      <div className={`${styles.grid_container}`}>
        <FileHandleOptions />
      </div>

      <div className={`${styles.grid_container}`}>
        <div
          className={`${styles.drawer_button}  ${styles.cursor_click} `}
          onClick={() => {
            visibleDrawer();
          }}
        >
          OPEN
        </div>
        {data && data.name ? (
          <div
            className={`${styles.title} ${styles.cursor_click} `}
            onClick={() => {
              revokeToken();
            }}
          >
            로그아웃
          </div>
        ) : (
          <Link href={"/login"}>
            <div className={`${styles.title} `}>로그인</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigator;
