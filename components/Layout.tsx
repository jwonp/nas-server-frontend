import { AppProps } from "next/app";
import Navigator from "./Navigator";
import styles from "../styles/Layout.module.css";
import Drawer from "./Drawer";
const Layout = (props: { children: JSX.Element }) => {
  return (
    <>
      <Navigator />
      <div id="content" className={`${styles.content} ${styles.withDrawer}`}>
        <Drawer />
        <div className={`${styles.children}`}>{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
