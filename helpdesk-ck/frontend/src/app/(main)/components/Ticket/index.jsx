import { CredContext } from "@/app/components/lib/CredentialsContext";
import isoToNormal from "@/lib/isoToNormal";
import axios from "axios";
import React, { useContext, useState } from "react";
import Notes from "./Notes";

export default function Ticket({ ticket, updateTick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { context } = useContext(CredContext);

  const handleOpen = () => {
    setIsOpen((val) => !val);
  };

  const handleStatusChange = (e) => {
    setMessage("Updating...");
    axios
      .patch(
        process.env.NEXT_PUBLIC_API_URL + `/tickets/${ticket._id}/status`,
        {
          status: e.target.value,
        },
        {
          headers: {
            Authorization: `${context.token}`,
          },
        },
      )
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Server Error");
      });
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <p>Ticket ID: {ticket._id}</p>
        <p>Title: {ticket.title}</p>
        {context.user?.role !== "Customer" ? (
          <p>Customer: {ticket.customer.name}</p>
        ) : null}
        <p>
          Status:{" "}
          {context.user?.role === "Customer" ? (
            ticket.status
          ) : (
            <select
              name="status"
              defaultValue={ticket.status}
              onChange={handleStatusChange}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          )}
          {message}
        </p>
        {context.user?.role !== "Customer" ? (
          <p>Customer: {ticket.customer.name}</p>
        ) : null}
        <p>Last updated on: {isoToNormal(ticket.lastUpdatedOn).dateTime}</p>
      </div>
      {isOpen ? (
        <Notes ticket={ticket} setIsOpen={setIsOpen} updateTick={updateTick} />
      ) : null}
    </div>
  );
}
