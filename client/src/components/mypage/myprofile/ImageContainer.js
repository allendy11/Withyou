import React, { useState, useRef } from "react";
import defaultImage from "../../../images/manImage.svg";
import axios from "axios";
const ImageContainer = ({
  userInfo,
  setUserInfo,
  userInput,
  setUserInput,
  editProfileBtn,
}) => {
  const accessTokenSession = sessionStorage.getItem("accessTokenSession");
  const { image } = userInfo;
  const imgInputRef = useRef();
  const imageHandler = (e) => {
    if (e.target.id === "addImg") {
      var reader = new FileReader();
      reader.onload = (ev) => {
        setUserInfo({
          ...userInfo,
          image: ev.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append("img", imgInputRef.current.files[0]);
      axios({
        url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/profile/image`,
        method: "POST",
        data: formData,
        headers: {
          authorization: `Bearer ${accessTokenSession}`,
          "content-type": "multipart/form-data",
        },
      }).then((res) => console.log(res.data));
    } else if (e.target.id === "deleteImg") {
      axios({
        url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/profile/image`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${accessTokenSession}`,
        },
      }).then(() => {
        setUserInfo({ ...userInfo, image: "" });
      });
    }
  };

  const sendFile = () => {};
  return (
    <div className="profile-image">
      <div className="profile-image-box">
        <img
          id="image"
          src={image ? `${image.slice(11)}` : defaultImage} // 테스트용 추후 삭제
          // src={image ? image : defaultImage}
          alt="#"
          style={{ pointerEvents: "none" }}
        />
      </div>
      {editProfileBtn ? (
        <form method="post" enctype="multipart/form-data">
          <div className="profile-editImage-btnBox">
            <label for="addImg">Add</label>
            <label id="deleteImg" for="" onClick={(e) => imageHandler(e)}>
              Delete
            </label>
          </div>
          <input
            type="file"
            ref={imgInputRef}
            id="addImg"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => imageHandler(e)}
          />
        </form>
      ) : null}
      {/* <button onClick={sendFile}>save</button> */}

      {/* {editProfileBtn ? (
        <div className="profile-editImage-btnBox">
          <input
            ref={imgInputRef}
            type="file"
            id="add-image"
            style={{
              display: "none",
            }}
            onChange={profileImgHandler}
          ></input>
          <button
            id="img-add-button"
            onClick={() => imgInputRef.current.click()}
          >
            Add Image
          </button>
        </div>
      ) : null} */}
    </div>
  );
};

export default ImageContainer;
