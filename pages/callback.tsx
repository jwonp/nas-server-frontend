import { useRouter } from "next/router";
import { useEffect } from "react";

const CallBack = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady === true) {
      const { code } = router.query;
      window.localStorage.setItem("code", code as string);
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  return <div></div>;
};
export default CallBack;
