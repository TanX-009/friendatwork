"use client";

import { CredContext } from "@/app/components/lib/CredentialsContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import User from "./components/User";

export default function Users() {
  const { context } = useContext(CredContext);
  const [isAdding, setIsAdding] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [tick, updateTick] = useState(false);

  const handleAddUser = (e) => {
    event.preventDefault();
    setMessage("");

    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const role = event.target[3].value;
    console.log(name, email, password, role);
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + "/user/",
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization: `${context.token}`,
          },
        },
      )
      .then((response) => {
        setIsAdding(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response?.data?.message || "Server error");
      });
  };

  useEffect(() => {
    if (context.token) {
      setMessage("Loading...");
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
  }, [context.token, isAdding, tick]);

  if (context.user?.role === "Customer") {
    return "Access denied!";
  }
  return (
    <div>
      <h2>Users</h2>

      {isAdding ? (
        <form onSubmit={handleAddUser}>
          <input required type="text" placeholder="Name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <select defaultValue={"Customer"}>
            <option value="Customer">Customer</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>
          <input required type="submit" value="Add"></input>
        </form>
      ) : (
        <button type="button" onClick={() => setIsAdding(true)}>
          Add user
        </button>
      )}

      {message}

      <div>
        {users.map((user, index) => (
          <User key={index} user={user} updateTick={updateTick} />
        ))}
      </div>
    </div>
  );
}
