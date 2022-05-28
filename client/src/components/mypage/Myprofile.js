import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/mypage/Myprofile.css";
import ImageContainer from "./myprofile/ImageContainer";
import ProfileContainer from "./myprofile/ProfileContainer";
import dotenv from "dotenv";
// import edit from "../../../../server/controllers/user/edit";
dotenv.config();

axios.default.withCredentials = true;

const Myprofile = () => {
  const accessToken = sessionStorage.getItem("accessTokenSession");
  const [editProfileBtn, setEditProfileBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    mobile: "",
    image: "",
  });
  const [userInput, setUserInput] = useState({
    username: "",
    mobile: "",
    image: "",
  });
  const handleClick = async (e) => {
    // const loginType = sessionStorage.getItem("loginType");

    if (e.target.id === "btn-edit") {
      setEditProfileBtn(true);
    } else if (e.target.id === "btn-save") {
      try {
        const data = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/profile`,
          data: {
            username: userInput.username,
            mobile: userInput.mobile,
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }).catch((err) => alert(err));
        setUserInfo({
          ...userInfo,
          email: data.data.email,
          username: data.data.username,
          mobile: data.data.mobile,
        });
        setUserInput({
          ...userInput,
          username: data.data.username,
          mobile: data.data.mobile,
        });
        setEditProfileBtn(false);
      } catch (err) {}
    } else if (e.target.id === "btn-cancel") {
      setUserInput({
        username: userInfo.username,
        mobile: userInfo.mobile,
        image: userInfo.image,
      });
      setEditProfileBtn(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      try {
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/profile`,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => {
          setUserInfo({
            username: res.data.username,
            email: res.data.email,
            mobile: res.data.mobile,
            image: res.data.image,
          });
          setUserInput({
            username: res.data.username,
            mobile: res.data.mobile,
            image: res.data.image,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  const pofileImgHandler = async (event) => {
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
    <div>
      <div className="mypage-title">⭐️ My Profile</div>
      <div>
        <div id="profile-content">
          <ImageContainer
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userInput={userInfo}
            setUserInput={setUserInput}
            editProfileBtn={editProfileBtn}
          />
          <ProfileContainer
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userInput={userInfo}
            setUserInput={setUserInput}
            editProfileBtn={editProfileBtn}
          />
        </div>
        {editProfileBtn ? (
          <div className="button-box">
            <button id="btn-save" onClick={handleClick}>
              Save
            </button>
            <button id="btn-cancel" onClick={handleClick}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="button-box">
            <button id="btn-edit" onClick={handleClick}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
