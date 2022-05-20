import React from "react";

export default function Zindex({
  zindex,
  decreaseZindex,
  increaseZindex,
  setCurrentZindex,
  modifyZindex,
  currentZindex,
}) {
  return (
    <div id="control-zindex">
      <div>레이어</div>
      <div id="zindex-buttons">
        <button
          className="control-button"
          onClick={() => {
            if (zindex !== 0) {
              decreaseZindex(Number(zindex - 2));
            }
          }}
        >
          -
        </button>
        <input
          className="input-area"
          type="number"
          value={currentZindex}
          onChange={(e) => {
            const current = Number(e.target.value);
            if (current >= 0) {
              setCurrentZindex(current);
              modifyZindex(current);
            }
          }}
        />
        <button
          className="control-button"
          onClick={() => {
            increaseZindex(Number(zindex + 2));
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
