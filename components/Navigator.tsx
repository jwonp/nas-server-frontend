import Image from "next/image";
import icon from "../public/vercel.svg";
import styles from "../styles/Navigator.module.css";
import { useRouter } from "next/router";
import { vaildToken } from "./tools/requests";
import { useEffect, useMemo, useRef } from "react";
import FileHandleOptions from "./FileHandleOptions";
import { useAppDispatch, useAppSelector } from ".././redux/hooks";
import {
  removeUsername,
  setUsername,
  setOnFileInput,
  getUsername,
  getOnFileInput,
} from "../redux/features/menu";

import { switchDrawer } from "../redux/features/drawerSwitch";
import axios from "axios";
import { auth_uri } from "../public/static/Strings";

const Navigator = () => {
  const $wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onFileInput = useAppSelector(getOnFileInput);
  const username = useAppSelector(getUsername);

  const isOnMobile = useMemo(() => {
    if (router.isReady) {
      if (window.matchMedia("screen and (max-width:500px)").matches)
        return true;
    } else return false;
  }, [router.isReady]);

  useEffect(() => {
    if (router.asPath.includes("/storage")) {
      dispatch(setOnFileInput(true));
    } else dispatch(setOnFileInput(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    vaildToken(window.localStorage.getItem("access_token"), (res) => {
      if (!res) return;
      if (res.status !== 200) router.push(auth_uri);
      dispatch(setUsername(res.data.name));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const visibleDrawer = () => {
    dispatch(switchDrawer());
  };

  const revokeToken = async () => {
    const token = window.localStorage.getItem("access_token");
    await axios.get(`/api/revoke/${token}`).then((res) => {
      if (res.status === 200) {
        window.localStorage.removeItem("access_token");
        dispatch(removeUsername());
        router.push("https://api.ikiningyou.com/admin/logout/");
      }
    });
    await axios.get("/api/revoke/refreshToken");
  };

  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper} ${styles.wrapper_grid_cols}`}
    >
      <div className={`${styles.grid_container}`}>
        <div
          className={`${styles.drawer_button}  ${styles.cursor_click} `}
          onClick={() => {
            visibleDrawer();
          }}
        >
          <Image
            src={"/drawerSwitch.svg"}
            alt={"#"}
            width={isOnMobile ? 35 : 70}
            height={isOnMobile ? 35 : 70}
            priority={true}
          />
        </div>

        <div className={`${styles.logo} ${isOnMobile ? styles.hidden : ""}`}>
          <Image src={icon} width={45} height={45} alt={"No image"} />
        </div>
      </div>

      <div className={`${styles.grid_container}`}>
        {onFileInput ? <FileHandleOptions /> : <></>}
      </div>

      <div className={`${styles.grid_container}`}>
        {username !== "" ? (
          <div className={`${styles.option_container}`}>
            <div
              className={`${styles.title}`}
              onClick={() => {
                if (username === "typing") {
                  router.push("/admin/db");
                }
              }}
            >
              {username}
            </div>
            <div
              className={`${styles.title} ${styles.cursor_click} `}
              onClick={() => {
                revokeToken();
              }}
            >
              로그아웃
            </div>
          </div>
        ) : (
          <div
            className={`${styles.title} `}
            onClick={() => {
              router.push(auth_uri);
            }}
          >
            로그인
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigator;
