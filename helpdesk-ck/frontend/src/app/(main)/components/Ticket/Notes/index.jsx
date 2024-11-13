"use client";

import React, { useContext, useState } from "react";
import Note from "./Note";
import axios from "axios";
import { CredContext } from "@/app/components/lib/CredentialsContext";

export default function Notes({ ticket, setIsOpen, updateTick }) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const { context } = useContext(CredContext);

  const handleAddNote = (e) => {
    e.preventDefault();
    setMessage("Adding...");
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + `/tickets/${ticket._id}/note`,
        {
          content: e.target[0].value,
          attachment: [],
        },
        {
          headers: {
            Authorization: `${context.token}`,
          },
        },
      )
      .then((response) => {
        setMessage("");
        setIsAdding(false);
        setIsOpen(false);
        updateTick((val) => !val);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response?.data?.message || "Server Error");
      });
  };
  return (
    <>
      <p>Notes</p>
      <div>
        {ticket.notes.map((note, index) => {
          return <Note key={index} note={note} />;
        })}
      </div>

      {isAdding ? (
        <form onSubmit={handleAddNote}>
          <input required type="text" placeholder="Note" />
          {message}
          <input required type="submit" value="Add"></input>
        </form>
      ) : (
        <button type="button" onClick={() => setIsAdding(true)}>
          Add Note/Reply
        </button>
      )}
    </>
  );
}
