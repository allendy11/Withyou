import React, { useState } from "react";
import PropertyTitle from "./propertys/PropertyTitle";
import TextStyle from "./propertys/TextStyle";
import TextColor from "./propertys/TextColor";
import TextSize from "./propertys/TextSize";
import Rotate from "./propertys/Rotate";
import Zindex from "./propertys/Zindex";

export default function TextProperty({
  id,
  clientWidth,
  removeObject,
  textSize,
  modifyTextSize,
  textColor,
  modifyTextColor,
  textStyle,
  modifyTextStyle,
  currentRotate,
  rotateDeClockSide,
  rotateClockSide,
  setCurrentRotate,
  rotateObject,
  zindex,
  decreaseZindex,
  increaseZindex,
  setCurrentZindex,
  modifyZindex,
  currentZindex,
}) {
  const [currentTextSyle, setCurrentTextSyle] = useState(textStyle);

  function onChangeTextStyle(e) {
    const nextState = e.target.value;
    setCurrentTextSyle(nextState);
    modifyTextStyle(nextState);
  }

  return (
    <div id="property-modal" key={id}>
      <PropertyTitle removeObject={removeObject} />
      <div id="control-box">
        <TextStyle
          currentTextSyle={currentTextSyle}
          onChangeTextStyle={onChangeTextStyle}
          clientWidth={clientWidth}
        />
        <TextColor textColor={textColor} modifyTextColor={modifyTextColor} />
        <TextSize textSize={textSize} modifyTextSize={modifyTextSize} />
        <Rotate
          currentRotate={currentRotate}
          rotateDeClockSide={rotateDeClockSide}
          rotateClockSide={rotateClockSide}
          setCurrentRotate={setCurrentRotate}
          rotateObject={rotateObject}
        />
        <Zindex
          zindex={zindex}
          decreaseZindex={decreaseZindex}
          increaseZindex={increaseZindex}
          setCurrentZindex={setCurrentZindex}
          modifyZindex={modifyZindex}
          currentZindex={currentZindex}
        />
      </div>
    </div>
  );
}
