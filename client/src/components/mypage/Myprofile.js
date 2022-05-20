import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import addImg from "../../images/manImage.svg";
import "../../css/mypage/Myprofile.css";
import dotenv from "dotenv";
dotenv.config();

axios.default.withCredentials = true;

const Myprofile = () => {
  const { clientWidth } = document.body;
  const accessToken = sessionStorage.getItem("accessTokenSession");
  const imgInputRef = useRef();
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
  const { username, email, mobile } = userInfo;
  const [editProfileBtn, setEditProfileBtn] = useState(false);
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
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
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
      {editProfileBtn ? (
        <div>
          <div id="profile-content">
            <div className="profile-image">
              <div className="profile-image-box">
                <img
                  id="image"
                  src={userInfo.image ? userInfo.image : addImg}
                  alt="#"
                  style={{ pointerEvents: "none" }}
                />
              </div>

              <input
                ref={imgInputRef}
                type="file"
                id="add-image"
                style={{
                  display: "none",
                }}
                onChange={pofileImgHandler}
              ></input>
              <button
                id="img-add-button"
                onClick={() => imgInputRef.current.click()}
              >
                Add Image
              </button>
            </div>
            <div className="userinfo">
              <div id="e-mail" className="uerInfo-row">
                <span>💫 email : </span>
                <span>{email}</span>
              </div>
              <div id="username" className="uerInfo-row">
                <div>
                  <span>💫 username : </span>
                  <input
                    id="username"
                    type="text"
                    value={userInput.username}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div id="mobile" className="uerInfo-row">
                <div>
                  <span>💫 mobile : </span>
                  <input
                    id="mobile"
                    type="text"
                    value={userInput.mobile}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="button-box">
              <button id="btn-save" onClick={handleClick}>
                Save
              </button>
              <button id="btn-cancel" onClick={handleClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="profile-content">
            <div className="profile-image">
              <div className="profile-image-box">
                <img
                  id="image"
                  src={userInfo.image ? userInfo.image : addImg}
                  alt="#"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            </div>
            <div className="userinfo">
              <div id="e-mail" className="uerInfo-row">
                <span>💫 email : </span>
                <span>{email}</span>
              </div>
              <div id="username" className="uerInfo-row">
                <span>💫 username : </span>
                <span>{username}</span>
              </div>
              <div id="mobile" className="uerInfo-row">
                <span>💫 mobile : </span>
                <span>{mobile}</span>
              </div>
            </div>
          </div>
          <div className="button-box">
            <button id="btn-edit" onClick={handleClick}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myprofile;
