"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CredContext } from "../components/lib/CredentialsContext";
import axios from "axios";
import Ticket from "./components/Ticket";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [adding, setAdding] = useState(false);
  const [tick, updateTick] = useState(true);

  const { context } = useContext(CredContext);

  const handleAddTicket = (event) => {
    event.preventDefault();
    setMessage("Adding ticket...");
    const title = event.target[0].value;
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/tickets/",
        {
          title,
        },
        {
          headers: {
            Authorization: `${context.token}`,
          },
        },
      )
      .then((response) => {
        setMessage("");
        setTickets([...tickets, response.data]);
        setAdding(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response?.data?.message || "Server error");
      });
  };

  useEffect(() => {
    setMessage("Fetching tickets...");
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
          setMessage(error.response?.data?.message || "Server error");
        });
    }
  }, [context.token, adding, tick]);

  return (
    <div>
      <div>
        {context.user &&
        context.user.role !== "Admin" &&
        context.user.role !== "Agent" ? (
          !adding ? (
            <button onClick={() => setAdding(true)}>Add Ticket</button>
          ) : (
            <form onSubmit={handleAddTicket}>
              <input required type="text" placeholder="Title" />
              <input required type="submit" value="Add Ticket" />
            </form>
          )
        ) : null}
      </div>
      {message}
      <div>
        {tickets.map((ticket, index) => (
          <Ticket key={index} ticket={ticket} updateTick={updateTick} />
        ))}
      </div>
    </div>
  );
}
