import React, { useEffect } from "react";
import { useRouter } from "next/router";
const myaccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.q]);
  return <div>myaccount</div>;
};

export default myaccount;
