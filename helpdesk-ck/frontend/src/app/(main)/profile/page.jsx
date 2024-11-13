"use client";

import { CredContext } from "@/app/components/lib/CredentialsContext";
import areObjectsEqual from "@/lib/areObjectsEqual";
import axios from "axios";
import React, { useContext, useState } from "react";

export default function Profile() {
  const { context, updateContext } = useContext(CredContext);
  const [form, setForm] = useState({
    id: context.user?.id,
    name: context.user?.name,
    email: context.user?.email,
    role: context.user?.role,
  });
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setMessage("Updating...");
    axios
      .patch(process.env.NEXT_PUBLIC_API_URL + "/user/profile", form, {
        headers: {
          Authorization: `${context.token}`,
        },
      })
      .then((response) => {
        updateContext({ user: response.data.user });
        setForm(response.data.user);
        setMessage("Profile updated!");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message || "Server Error");
      });
  };

  return (
    <form onSubmit={onSave}>
      <label htmlFor="name">
        Name
        <input
          required
          type="text"
          id="name"
          name="name"
          defaultValue={form?.name}
          onChange={handleOnChange}
        ></input>
      </label>
      <label htmlFor="email">
        Email
        <input
          required
          type="email"
          id="email"
          name="email"
          defaultValue={form?.email}
          onChange={handleOnChange}
        ></input>
      </label>

      {message}
      {!areObjectsEqual(context.user, form) ? (
        <input required type="submit" value="Save" />
      ) : null}
    </form>
  );
}
