import React, { useState } from "react";
import "../../../../css/editpage/canvas/modals/Image.css";

export default function Image({ addToItems }) {
  const [onError, setOnError] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  function getFile() {
    setOnError(false);
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
    const fileType = file.name.split(".")[1].toUpperCase();
    if (
      fileType === "JPG" ||
      fileType === "PNG" ||
      fileType === "JPEG" ||
      fileType === "SVG" ||
      fileType === "BMP"
    ) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setPreviewImg(reader.result);
      });
      document.querySelector("#image-input").value = "";
    }
  }

  function uploadFile() {
    if (previewImg !== "") {
      setOnError(false);
      addToItems(previewImg, "image");
      setPreviewImg("");
    } else {
      setOnError(true);
    }
  }

  return (
    <div id="image-modal">
      <div id="image-modal-nav" className="edit--menu-title">
        <div id="title">나만의 사진 넣기</div>
        <div id="content">원하는 사진을 선택해주세요.</div>
      </div>
      <div id="image-modal-upload">
        <label id="image-selector" typeof="button" htmlFor="image-input">
          사진 선택하기
        </label>
        <input
          type="file"
          id="image-input"
          style={{ opacity: 0 }}
          onChange={() => getFile()}
        />
        {previewImg && <img id="preview" src={previewImg} alt="preview" />}
        <div id="image-footer">
          <button
            id="add-image-button"
            onClick={() => {
              uploadFile();
            }}
          >
            캔버스에 추가하기
          </button>
          {onError && (
            <div id="error-message">
              선택한 사진이 올바르지 않습니다.
              <br />
              다시 선택해주세요.
              <br />
              (지원 형식 : JPG, JPEG, PNG, BMP)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
