import React from "react";

export default function FontList({ font }) {
  return (
    <option className="font-list" value={font}>
      {font}
    </option>
  );
}
