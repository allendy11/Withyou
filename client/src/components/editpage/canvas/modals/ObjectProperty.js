import React from "react";
import PropertyTitle from "./propertys/PropertyTitle";
import ObjectWidth from "./propertys/ObjectWidth";
import Rotate from "./propertys/Rotate";
import Zindex from "./propertys/Zindex";
import ObjectHeight from "./propertys/ObjectHeight";

export default function ObjectProperty({
  id,
  removeObject,
  width,
  resizeWidth,
  height,
  resizeHeight,
  rotateObject,
  rotateDeClockSide,
  currentRotate,
  setCurrentRotate,
  rotateClockSide,
  zindex,
  decreaseZindex,
  currentZindex,
  modifyZindex,
  increaseZindex,
  setCurrentZindex,
}) {
  return (
    <div id="property-modal" key={id}>
      <PropertyTitle removeObject={removeObject} />
      <div id="control-box">
        <ObjectWidth width={width} resizeWidth={resizeWidth} />
        <ObjectHeight height={height} resizeHeight={resizeHeight} />
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
