import React, { useState } from "react";

export default function TextSize({ textSize, modifyTextSize }) {
  const [currentTextSize, setCurrentTextSize] = useState(textSize);

  function increaseTextSize() {
    const nextState = textSize + 1;
    setCurrentTextSize(nextState);
    modifyTextSize(nextState);
  }

  function decreaseTextSize() {
    const nextState = textSize - 1;
    setCurrentTextSize(nextState);
    modifyTextSize(nextState);
  }
  return (
    <div id="control-size">
      <div>글자크기</div>
      <div className="object-button-area">
        <button
          className="control-button"
          onClick={() => {
            if (currentTextSize !== 0) {
              decreaseTextSize();
            }
          }}
        >
          -
        </button>
        <input
          className="input-area"
          type="number"
          value={Math.floor(currentTextSize)}
          onChange={(e) => {
            if (e.target.value >= 0) {
              setCurrentTextSize(Number(e.target.value));
              modifyTextSize(Number(e.target.value));
            }
          }}
        />
        <button className="control-button" onClick={() => increaseTextSize()}>
          +
        </button>
      </div>
    </div>
  );
}
