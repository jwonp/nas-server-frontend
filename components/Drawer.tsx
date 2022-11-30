import { useRef } from "react";
import styles from "../styles/Drawer.module.css";

import DrawerBar from "./DrawerBar";
import StorageSizeBar from "./StorageSizeBar";

const Drawer = () => {
  return (
    <div id="drawer" className={`${styles.wrapper}`}>
      <DrawerBar name={"내 드라이브"} />
      <DrawerBar name={"즐겨찾기"} />
      <StorageSizeBar />
    </div>
  );
};

export default Drawer;
