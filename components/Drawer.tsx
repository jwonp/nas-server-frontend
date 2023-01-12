import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/Drawer.module.css";

import DrawerBar from "./DrawerBar";
import StorageSizeBar from "./StorageSizeBar";
import axios from "axios";
import { ROOT_REF_NAME, FAVORITE_REF_NAME } from "../static/Strings";
import DragAndDropArea from "./DragAndDropArea";

const getFolders = async () => {
  return await axios.get("/test/getfolders");
};

const Drawer = ({ refresh_token }) => {
  // const [folders, setFolders] = useState<string[]>([]);
  // useEffect(() => {
  //   getFolders().then((res) => {
  //     setFolders(res.data);
  //   });
  // }, []);
  const isToken = useMemo(() => {
    // console.log("istoken : ", refresh_token);
    if (refresh_token) return true;
    else false;
  }, [refresh_token]);
  if (isToken) {
    return (
      <div id="drawer" className={`${styles.wrapper}`}>
        <DrawerBar name={ROOT_REF_NAME} />
        <DrawerBar name={FAVORITE_REF_NAME} />
        {/* {folders?.map((item) => (
          <DrawerBar key={item} name={item} />
        ))} */}
        <StorageSizeBar />
        <DragAndDropArea />
      </div>
    );
  } else {
    <div></div>;
  }
};

export default Drawer;
