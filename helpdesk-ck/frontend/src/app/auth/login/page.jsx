"use client";

import { CredContext } from "@/app/components/lib/CredentialsContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function Login() {
  const router = useRouter();

  const { updateContext } = useContext(CredContext);

  const [message, setMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setMessage("");

    const email = event.target[0].value;
    const password = event.target[1].value;
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        email,
        password,
      })
      .then((response) => {
        updateContext({ ...response.data });
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response?.data?.message || "Server error");
      });
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <input required type="email" placeholder="Email" />
        <input required type="password" placeholder="Password" />
        <input required type="submit" value="Login"></input>
        {message}
        <Link href="/auth/register">Register</Link>
      </form>
    </>
  );
}
