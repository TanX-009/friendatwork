"use client";
import { CredContext } from "@/app/components/lib/CredentialsContext";
import axios from "axios";
import React, { useContext, useState } from "react";

export default function User({ user, updateTick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const { context } = useContext(CredContext);

  const handleEdit = (e) => {
    e.preventDefault();
    setMessage("Updating...");
    const form = {
      id: user._id,
      name: e.target[0].value,
      email: e.target[1].value,
      role: e.target[2].value,
    };
    axios
      .patch(process.env.NEXT_PUBLIC_API_URL + "/user/profile", form, {
        headers: {
          Authorization: `${context.token}`,
        },
      })
      .then((response) => {
        updateTick((val) => !val);
        setMessage("Profile updated!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message || "Server Error");
      });
  };

  const handleDelete = () => {
    setMessage("Deleting...");
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + "/user/" + user._id, {
        headers: { Authorization: `${context.token}` },
      })
      .then(() => {
        setMessage("User deleted!");
        setIsDeleting(false);
        updateTick((val) => !val);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response?.data?.message || "Server error");
      });
  };

  if (user._id === context.user.id) return null;
  return (
    <div>
      {user.name} ({user.email}) - {user.role}
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input type="text" defaultValue={user.name} />
          <input type="email" defaultValue={user.email} />
          <select defaultValue={"Customer"}>
            <option value="Customer">Customer</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>
          <input type="submit" value="Update"></input>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
      {isDeleting ? (
        <div>
          Are you sure you want to delete {user.name}?
          <button type="button" onClick={handleDelete}>
            Yes
          </button>
          <button type="button" onClick={() => setIsDeleting(false)}>
            No
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setIsDeleting(true)}>
          Delete
        </button>
      )}
    </div>
  );
}
