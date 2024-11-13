"use client";

import React, { useContext, useEffect } from "react";
import { CredContext } from "../CredentialsContext";
import { usePathname, useRouter } from "next/navigation";

export default function CheckAuth() {
  const { context } = useContext(CredContext);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (
      path !== "/auth/login" &&
      path !== "/auth/register" &&
      context.token === null
    ) {
      router.push("/auth/login");
    }
  }, [context.token, router, path]);
  return <></>;
}
