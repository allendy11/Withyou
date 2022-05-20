import React, { useState } from "react";

export default function ObjectWidth({ width, resizeWidth }) {
  const [currentWidth, setCurrentWidth] = useState(width);
  function increaseWidth() {
    const nextState = currentWidth + 10;
    setCurrentWidth(nextState);
    resizeWidth(nextState);
  }

  function decreaseWidth() {
    const nextState = currentWidth - 10;
    setCurrentWidth(nextState);
    resizeWidth(nextState);
  }
  return (
    <div id="control-width">
      <div>가로</div>
      <div className="object-button-area">
        <button
          className="control-button"
          onClick={() => {
            if (currentWidth > 9) {
              decreaseWidth();
            }
          }}
        >
          -
        </button>
        <input
          className="input-area"
          type="number"
          value={Math.floor(currentWidth)}
          onChange={(e) => {
            if (e.target.value >= 0) {
              setCurrentWidth(Number(e.target.value));
              resizeWidth(Number(e.target.value));
            }
          }}
        />
        <button className="control-button" onClick={() => increaseWidth()}>
          +
        </button>
      </div>
    </div>
  );
}
