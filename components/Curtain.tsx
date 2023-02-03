import { closeDrawer, getDrawerSwitch } from "../redux/features/drawerSwitch";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/Curtain.module.css";
const Curtain = () => {
  const dispatch = useAppDispatch();
  const drawerSwitch = useAppSelector(getDrawerSwitch);
  return (
    <div
      className={`${styles.curtain} ${drawerSwitch ? "" : styles.invisible}`}
      onClick={() => {
        dispatch(closeDrawer());
      }}
    ></div>
  );
};

export default Curtain;
