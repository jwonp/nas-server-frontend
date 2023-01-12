import Image from "next/image";
import styles from "../styles/DrawerBar.module.css";
import folder from "../public/folder.png";
import Link from "next/link";
import { ROOT_REF_NAME, ROOT_REF, FAVORITE_REF } from "../static/Strings";

const DrawerBar = (props: { name: string; ref?: string }) => {
  return (
    <Link
      href={`/storage/${
        props.ref
          ? props.ref == ROOT_REF_NAME
            ? ROOT_REF
            : FAVORITE_REF
          : props.name
      }`}
    >
      <div className={`${styles.wrapper}`}>
        <Image src={folder} height={30} alt={"None"} />
        <span>{props.name.replace("_", " ")}</span>
      </div>
    </Link>
  );
};

export default DrawerBar;
