import Image from "next/image";
import styles from "../styles/DrawerBar.module.css";
import folder from "../public/folder.png";

const DrawerBar = (props: { name: string }) => {
  return (
    <div className={`${styles.wrapper}`}>
      <Image src={folder} height={30} alt={"None"} />
      <span>{props.name}</span>
    </div>
  );
};

export default DrawerBar;
