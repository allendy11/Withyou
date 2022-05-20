import React, { useState } from "react";

export default function ObjectHeight({ height, resizeHeight }) {
  const [currentHeight, setCurrentHeight] = useState(height);
  function increaseHeight() {
    const nextState = currentHeight + 10;
    setCurrentHeight(nextState);
    resizeHeight(nextState);
  }

  function decreaseHeight() {
    const nextState = currentHeight - 10;
    setCurrentHeight(nextState);
    resizeHeight(nextState);
  }
  return (
    <div id="control-height">
      <div>세로</div>
      <div className="object-button-area">
        <button
          className="control-button"
          onClick={() => {
            if (currentHeight > 9) {
              decreaseHeight();
            }
          }}
        >
          -
        </button>
        <input
          className="input-area"
          type="number"
          value={Math.floor(currentHeight)}
          onChange={(e) => {
            if (e.target.value >= 0) {
              setCurrentHeight(Number(e.target.value));
              resizeHeight(Number(e.target.value));
            }
          }}
        />
        <button className="control-button" onClick={() => increaseHeight()}>
          +
        </button>
      </div>
    </div>
  );
}
