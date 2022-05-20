import React, { useState } from "react";

export default function TextOnCanvas({
  id,
  modifyText,
  style,
  textStyle,
  textSize,
  textColor,
  isDragging,
  onMove,
  setOnMove,
  onClickObjcet,
  setMouseInitLocation,
  onDragAndDrop,
  controlCursorStyle,
  onDragEnd,
  onDragAndDropMobile,
  opacityOnObject,
}) {
  const [currentText, setCurrentText] = useState("텍스트를 입력해주세요.");
  return (
    <div
      key={id}
      id={id}
      contentEditable={true}
      placeholder={currentText}
      onChange={(e) => {
        setCurrentText(e.target.value);
        modifyText(e.target.value);
      }}
      style={{
        ...style,
        fontFamily: textStyle,
        fontSize: textSize,
        color: textColor,
      }}
      className='text-element'
      draggable={false}
      onMouseDown={(e) => {
        setOnMove(true);
        onClickObjcet(e);
        setMouseInitLocation(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const target = e.touches[0];
        onClickObjcet(e);
        setMouseInitLocation(target.clientX, target.clientY);
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          onDragAndDrop(e);
        }
      }}
      onMouseUp={(e) => {
        setOnMove(false);
        controlCursorStyle(e, 'grab');
        onDragEnd();
      }}
      onTouchEnd={(e) => {
        controlCursorStyle(e, 'grab');
        onDragEnd();
        document.body.style.overflow = null;
      }}
      onTouchMove={(e) => {
        document.body.style.overflow = 'hidden';
        document.querySelector('html').scrollTop = window.scrollY;
        if (isDragging) {
          onDragAndDropMobile(e.touches[0]);
        }
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, 'grab');
        opacityOnObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        opacityOnObject(e, 1);
        if (onMove) {
          onDragAndDrop(e);
        }
      }}
    >
      {currentText}
    </div>
  );
}
