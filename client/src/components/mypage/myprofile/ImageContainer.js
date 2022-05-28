import React, { useRef } from "react";
import defaultImage from "../../../images/manImage.svg";
import axios from "axios";
const ImageContainer = ({
  userInfo,
  setUserInfo,
  userInput,
  setUserInput,
  editProfileBtn,
}) => {
  const { image } = userInfo;
  const imgInputRef = useRef();

  const profileImgHandler = async (event) => {
    let reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
    }
    const formData = new FormData();
    formData.append("img", event.target.files[0]);
    const accessTokenSession = sessionStorage.getItem("accessTokenSession");

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_LOCAL_URL}/profile/image`,
      formData,
      {
        headers: {
          authorization: `Bearer ${accessTokenSession}`,
          "content-type": "multipart/form-data boundary=something",
        },
      }
    );
    setUserInfo({ ...userInfo, image: res.data.image });
  };
  return (
    <div className="profile-image">
      <div className="profile-image-box">
        <img
          id="image"
          src={image ? image : defaultImage}
          alt="#"
          style={{ pointerEvents: "none" }}
        />
      </div>
      {editProfileBtn ? (
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
      ) : null}
    </div>
  );
};

export default ImageContainer;
