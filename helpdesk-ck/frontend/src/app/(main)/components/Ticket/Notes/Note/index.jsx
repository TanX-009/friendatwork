import isoToNormal from "@/lib/isoToNormal";
import React from "react";

export default function Note({ note }) {
  return (
    <div>
      <p>{note?.content}</p>
      <p>Note/Reply by: {note?.addedBy?.name}</p>
      <p>Created at: {isoToNormal(note?.createdAt).dateTime}</p>
    </div>
  );
}
