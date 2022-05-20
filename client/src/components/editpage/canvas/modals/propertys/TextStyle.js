import React from "react";
import FontList from "../propertys/FontList";

export default function TextStyle({ currentTextSyle, onChangeTextStyle }) {
  const fontLIst = [
    "BinggraeMelona",
    "Gulimn",
    "NanumGothic-Bold",
    "NanumGothic-Regular",
    "NanumMyeongjo-Bold",
    "NanumMyeongjo-Regular",
  ];
  return (
    <div id="control-style">
      <div>글꼴</div>
      <div className="object-button-area">
        <select
          name="selectList"
          id="selectList"
          value={currentTextSyle}
          onChange={(e) => {
            onChangeTextStyle(e);
          }}
        >
          {fontLIst.map((el) => (
            <FontList font={el} />
          ))}
        </select>
      </div>
    </div>
  );
}
