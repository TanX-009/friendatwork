"use client";

import { CredContext } from "@/app/components/lib/CredentialsContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { context } = useContext(CredContext);
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("Loading...");
    if (context.token) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/tickets/", {
          headers: {
            Authorization: `${context.token}`,
          },
        })
        .then((response) => {
          setMessage("");
          setTickets(response.data);
        })
        .catch((error) => {
          console.log(error);
          setMessage(error.response.data.message || error.response);
        });

      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/user/", {
          headers: {
            Authorization: `${context.token}`,
          },
        })
        .then((response) => {
          setMessage("");
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
          setMessage(error.response.data.message || error.response);
        });
    }
  }, [context.token]);

  if (context.user?.role === "Customer") {
    return "Access Denied!";
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {message}
      <div>Total Tickets: {tickets.length}</div>
      <div>Total Users: {users.length}</div>
    </div>
  );
}
