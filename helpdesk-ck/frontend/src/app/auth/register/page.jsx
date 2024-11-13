"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function Register() {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    setMessage("");

    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        setMessage("User registered successfully");
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response?.data?.message || "Server error");
      });
  };
  return (
    <form onSubmit={handleRegister}>
      <input required type="text" placeholder="Name" />
      <input required type="email" placeholder="Email" />
      <input required type="password" placeholder="Password" />
      <input required type="submit" value="Register"></input>
      <Link href="/auth/login">Login</Link>
      {message}
    </form>
  );
}
