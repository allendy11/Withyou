import React, { useState } from "react";
import "../../../../css/editpage/canvas/modals/PrintProperty.css";
import ObjectProperty from "./ObjectProperty";
import TextProperty from "./TextProperty";

export default function PrintProperty({
  id,
  type,
  width,
  resizeWidth,
  height,
  resizeHeight,
  transform,
  rotateObject,
  removeObject,
  zindex,
  modifyZindex,
  clientWidth,
  textSize,
  textColor,
  textStyle,
  modifyTextSize,
  modifyTextColor,
  modifyTextStyle,
}) {
  const [currentRotate, setCurrentRotate] = useState(
    transform.slice(7).slice(0, -4)
  );
  const [currentZindex, setCurrentZindex] = useState(zindex);

  function rotateClockSide() {
    const nextState = String(+currentRotate + 10);
    setCurrentRotate(nextState);
    rotateObject(`rotate(${nextState}deg)`);
  }

  function rotateDeClockSide() {
    const nextState = String(+currentRotate - 10);
    setCurrentRotate(nextState);
    rotateObject(`rotate(${nextState}deg)`);
  }

  function increaseZindex() {
    const nextState = zindex + 1;
    setCurrentZindex(nextState);
    modifyZindex(nextState);
  }

  function decreaseZindex() {
    const nextState = zindex - 1;
    setCurrentZindex(nextState);
    modifyZindex(nextState);
  }

  return type === "image" || type === "templates" ? (
    <ObjectProperty
      id={id}
      removeObject={removeObject}
      width={width}
      resizeWidth={resizeWidth}
      height={height}
      resizeHeight={resizeHeight}
      rotateObject={rotateObject}
      rotateDeClockSide={rotateDeClockSide}
      currentRotate={currentRotate}
      setCurrentRotate={setCurrentRotate}
      rotateClockSide={rotateClockSide}
      zindex={zindex}
      decreaseZindex={decreaseZindex}
      currentZindex={currentZindex}
      modifyZindex={modifyZindex}
      increaseZindex={increaseZindex}
      setCurrentZindex={setCurrentZindex}
    />
  ) : (
    <TextProperty
      id={id}
      clientWidth={clientWidth}
      removeObject={removeObject}
      textSize={textSize}
      modifyTextSize={modifyTextSize}
      textColor={textColor}
      modifyTextColor={modifyTextColor}
      textStyle={textStyle}
      modifyTextStyle={modifyTextStyle}
      currentRotate={currentRotate}
      rotateDeClockSide={rotateDeClockSide}
      rotateClockSide={rotateClockSide}
      setCurrentRotate={setCurrentRotate}
      rotateObject={rotateObject}
      zindex={zindex}
      decreaseZindex={decreaseZindex}
      increaseZindex={increaseZindex}
      setCurrentZindex={setCurrentZindex}
      modifyZindex={modifyZindex}
      currentZindex={currentZindex}
    />
  );
}
