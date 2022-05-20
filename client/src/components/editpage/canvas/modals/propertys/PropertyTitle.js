import React from "react";

export default function PropertyTitle({ removeObject }) {
  return (
    <div id="property-title-button">
      <div>Edit Detail</div>
      <button id="delete-button" onClick={() => removeObject()}>
        Delete
      </button>
    </div>
  );
}
