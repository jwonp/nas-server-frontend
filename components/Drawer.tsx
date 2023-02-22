import styles from "../styles/Drawer.module.css";
import DrawerBar from "./DrawerBar";
import StorageSizeBar from "./StorageSizeBar";
import { ROOT_REF_NAME, FAVORITE_REF_NAME } from "../public/static/Strings";

import { getUsername } from "../redux/features/menu";
import { useAppSelector } from "../redux/hooks";
import Curtain from "./Curtain";
import { getDrawerSwitch } from "../redux/features/drawerSwitch";

const Drawer = () => {
  const username = useAppSelector(getUsername);
  const drawerSwitch = useAppSelector(getDrawerSwitch);

  return (
    <div
      id="drawer"
      className={`${styles.wrapper} ${
        drawerSwitch ? styles.fixed_visible : ""
      }`}
    >
      {username !== "" ? (
        <>
          {" "}
          <DrawerBar name={ROOT_REF_NAME} />
          {/* <DrawerBar name={FAVORITE_REF_NAME} /> */}
          <StorageSizeBar />
        </>
      ) : (
        <></>
      )}
      <Curtain />
    </div>
  );
};

export default Drawer;
