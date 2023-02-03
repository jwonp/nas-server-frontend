import styles from "../styles/Layout.module.css";
import Drawer from "./Drawer";
import dynamic from "next/dynamic";

const Layout = (props: { children: JSX.Element }) => {
  const Navigator = dynamic(() => import("./Navigator"), {
    ssr: false,
  });

  return (
    <>
      <Navigator />
      <div id="content" className={`${styles.content}`}>
        <Drawer />
        <div className={`${styles.children}`}>{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
