import React, { useState } from "react";
import ImageOnCanvas from "./ImageOnCanvas";
import TemplateOnCanvas from "./TemplateOnCanvas";
import TextOnCanvas from "./TextOnCanvas";

export default function PrintOnCanvas({
  id,
  src,
  textColor,
  textSize,
  textStyle,
  style,
  isSelected,
  isDragging,
  onDragStart,
  onDragEnd,
  onSelect,
  deSelectObject,
  onChangeStyle,
  initLocation,
  setMouseInitLocation,
  currentLocation,
  setMouseCurrentLocation,
  clientWidth,
  modifyText,
}) {
  const [onMove, setOnMove] = useState(false);
  const { left, top } = document
    .querySelector("#canvas-paper")
    .getBoundingClientRect();

  function opacityOnObject(e, opacity) {
    e.target.style.opacity = opacity;
  }

  function controlCursorStyle(e, type) {
    e.target.style.cursor = type;
  }

  function onClickObjcet(e) {
    deSelectObject();
    onSelect();
    onDragStart();
    setMouseCurrentLocation(
      e.target.getBoundingClientRect().left,
      e.target.getBoundingClientRect().top
    );
    controlCursorStyle(e, "grabbing");
  }

  function onDragAndDrop(e) {
    const differX = initLocation.x - currentLocation.x;
    const differY = initLocation.y - currentLocation.y;
    let x = e.clientX - differX - left;
    let y = e.clientY - differY - top;
    if (clientWidth >= 900) {
      onChangeStyle({
        left: x / 2,
        top: y / 2,
      });
    } else {
      onChangeStyle({
        left: x,
        top: y,
      });
    }
  }

  function onDragAndDropMobile(e) {
    const differX = initLocation.x - currentLocation.x;
    const differY = initLocation.y - currentLocation.y;
    let x = e.clientX - differX - left;
    let y = e.clientY - differY - top;
    onChangeStyle({
      left: x / 2,
      top: y / 2,
    });
  }
  function setObjectStyle(style, isSelected) {
    const deleteRotateStyle = { ...style };
    delete deleteRotateStyle.transform;

    return {
      ...deleteRotateStyle,
      border: isSelected ? "dotted 2px red" : "solid 2px transparent",
    };
  }

  if (style.type === "image") {
    return (
      <ImageOnCanvas
        id={id}
        src={src}
        style={style}
        isSelected={isSelected}
        isDragging={isDragging}
        onMove={onMove}
        setOnMove={setOnMove}
        setObjectStyle={setObjectStyle}
        onClickObjcet={onClickObjcet}
        setMouseInitLocation={setMouseInitLocation}
        onDragAndDrop={onDragAndDrop}
        controlCursorStyle={controlCursorStyle}
        onDragEnd={onDragEnd}
        onDragAndDropMobile={onDragAndDropMobile}
        opacityOnObject={opacityOnObject}
      />
    );
  } else if (style.type === "text") {
    return (
      <TextOnCanvas
        id={id}
        modifyText={modifyText}
        style={style}
        textStyle={textStyle}
        textSize={textSize}
        textColor={textColor}
        isDragging={isDragging}
        onMove={onMove}
        setOnMove={setOnMove}
        onClickObjcet={onClickObjcet}
        setMouseInitLocation={setMouseInitLocation}
        onDragAndDrop={onDragAndDrop}
        controlCursorStyle={controlCursorStyle}
        onDragEnd={onDragEnd}
        onDragAndDropMobile={onDragAndDropMobile}
        opacityOnObject={opacityOnObject}
      />
    );
  } else if (style.type === "templates") {
    return (
      <TemplateOnCanvas
        id={id}
        src={src}
        style={style}
        setObjectStyle={setObjectStyle}
      />
    );
  }
}
