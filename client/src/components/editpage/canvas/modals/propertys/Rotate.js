import React from "react";

export default function Rotate({
  currentRotate,
  rotateDeClockSide,
  rotateClockSide,
  setCurrentRotate,
  rotateObject,
}) {
  return (
    <div id="control-rotate">
      <div>회전</div>
      <div className="object-button-area">
        <button className="control-button" onClick={() => rotateDeClockSide()}>
          -
        </button>
        <input
          className="input-area"
          type="number"
          value={Math.floor(currentRotate)}
          onChange={(e) => {
            let current = e.target.value % 360;
            setCurrentRotate(Number(current));
            rotateObject(`rotate(${Number(current)}deg)`);
          }}
        />
        <button className="control-button" onClick={() => rotateClockSide()}>
          +
        </button>
      </div>
    </div>
  );
}
