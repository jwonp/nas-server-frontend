import Image from "next/image";
import icon from "../public/vercel.svg";
import styles from "../styles/Navigator.module.css";
import { useRouter } from "next/router";
const Navigator = () => {
  const router = useRouter();

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.logo}`}>
        <Image src={icon} width={50} height={50} alt={"No image"} />
      </div>
      <div className={`${styles.title}`}>{`${router.basePath}`}</div>
    </div>
  );
};

export default Navigator;
