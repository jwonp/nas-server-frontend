import Image from "next/image";
import icon from "../public/vercel.svg";
import styles from "../styles/Navigator.module.css";
import DrawerStyles from "../styles/Drawer.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { vaildToken, logout } from "./tools/requests";
import { useEffect, useMemo, useState } from "react";
import FileHandleOptions from "./FileHandleOptions";
import { revokeDataType } from "../public/static/types/revokeDataType";
import { useAppDispatch, useAppSelector } from ".././redux/hooks";
import {
  removeUsername,
  setUsername,
  setOnFileInput,
  getUsername,
  getOnFileInput,
} from "../redux/features/menu";
import { getSelected } from "../redux/features/selectedFiles";

import { getHistory } from "./tools/functions";
import { getDrawerSwitch, switchDrawer } from "../redux/features/drawerSwitch";

const Navigator = () => {
  const router = useRouter();
  // const [onFileOptions, setOnFileOptions] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const drawerSwitch = useAppSelector(getDrawerSwitch);
  const onFileInput = useAppSelector(getOnFileInput);
  const username = useAppSelector(getUsername);
  const selected = useAppSelector(getSelected);
  const loginGrid = useMemo(() => {
    if (username !== "") {
    }
  }, [username]);

  useEffect(() => {
    if (router.asPath.includes("/storage")) {
      dispatch(setOnFileInput(true));
    } else dispatch(setOnFileInput(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    vaildToken(window.localStorage.getItem("access_token"), (res) => {
      if (!res) return;
      dispatch(setUsername(res.data.name));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  const refs = router.query.ref as string[];

  const visibleDrawer = () => {
    dispatch(switchDrawer());
  };

  const revokeToken = async () => {
    const revokeData: revokeDataType = {
      token: window.localStorage.getItem("access_token"),
    };
    logout(revokeData, (res) => {
      if (res.status === 200) {
        window.localStorage.removeItem("access_token");
        dispatch(removeUsername());
        router.push("/");
      }
    });
  };

  return (
    <div className={`${styles.wrapper}`}>
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
            width={70}
            height={70}
            priority={true}
          />
        </div>
        <Link href={"/"}>
          <div className={`${styles.logo}`}>
            <Image src={icon} width={45} height={45} alt={"No image"} />
          </div>
        </Link>
      </div>

      <div className={`${styles.grid_container}`}>
        {onFileInput ? <FileHandleOptions /> : <></>}
      </div>

      <div className={`${styles.grid_container}`}>
        {username !== "" ? (
          <div className={`${styles.option_container}`}>
            <div className={`${styles.title}`}>{username}</div>
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
          <Link href={"/login"}>
            <div className={`${styles.title} `}>로그인</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigator;

// .join(" > ").replace("_", " ")
