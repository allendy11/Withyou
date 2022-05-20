import React from "react";

export default function LinkToGitHub({ github, name, landingOn }) {
  return (
    <a href={`https://github.com/${github}`} rel="noreferrer" target="_blank">
      <span
        style={{
          color: `${landingOn ? "#f2f0ec" : "black"}`,
        }}
      >
        {name}
      </span>
    </a>
  );
}
