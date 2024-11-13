"use client";
import { CredContext } from "@/app/components/lib/CredentialsContext";
import Link from "next/link";
import React, { useContext } from "react";

export default function Sidebar() {
  const { context } = useContext(CredContext);

  if (context.user?.role === "Customer") {
    return (
      <div>
        <Link href="/">Tickets</Link>
        <Link href="/profile">Profile</Link>
      </div>
    );
  } else if (context.user?.role === "Agent") {
    return (
      <div>
        <Link href="/">Tickets</Link>
        <Link href="/profile">Profile</Link>
      </div>
    );
  } else if (context.user?.role === "Admin") {
    return (
      <div>
        <Link href="/">Tickets</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/users">Users</Link>
      </div>
    );
  } else {
    return null;
  }
}

/* /                - all tickets
 * /profile         - customer profile
 * /dashboard       - dashboard for admin
 * /users           - manage profiles(users) only admin
 *
 * */
