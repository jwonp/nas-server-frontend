import { AppProps } from "next/app";
// import Navigator from "./Navigator";
import styles from "../styles/Layout.module.css";
import Drawer from "./Drawer";
import useSWR, { preload } from "swr";
import { refreshToken } from "./tools/fetcher";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
const Layout = (props: { children: JSX.Element }) => {
  const Navigator = dynamic(() => import("./Navigator"), {
    ssr: false,
  });
  const isError = useRef<boolean>(false);

  const fetched_refresh = useSWR("/test/refresh", refreshToken, {
    refreshInterval: 29500,
    errorRetryCount: 2,
  });

  useEffect(() => {
    if (fetched_refresh.data && fetched_refresh.data?.access_token) {
      window.localStorage.setItem(
        "access_token",
        fetched_refresh.data.access_token
      );
      window.localStorage.setItem(
        "refresh_token",
        fetched_refresh.data.refresh_token
      );
    }
  }, [fetched_refresh]);

  return (
    <>
      <Navigator refresh_token={fetched_refresh.data?.refresh_token} />
      <div id="content" className={`${styles.content}`}>
        <Drawer refresh_token={fetched_refresh.data?.refresh_token} />
        <div className={`${styles.children}`}>{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
