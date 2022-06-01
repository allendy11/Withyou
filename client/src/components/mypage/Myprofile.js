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
  const [profileErr, setProfileErr] = useState("");
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
    if (e.target.id === "btn-edit") {
      setEditProfileBtn(true);
    } else if (e.target.id === "btn-save") {
      var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      const mobileNum = userInput.mobile;
      if (mobileNum !== "" && !regPhone.test(userInput.mobile)) {
        setProfileErr("전화번호 형식이 올바르지 않습니다.");
      } else {
        try {
          axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/profile`,
            data: {
              username: userInput.username,
              mobile: userInput.mobile,
            },
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }).then(() => {
            setUserInfo({
              ...userInfo,
              username: userInput.username,
              mobile: userInput.mobile,
            });
            setProfileErr("");
            setEditProfileBtn(false);
          });
        } catch (err) {
          console.log(err);
        }
      }
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

  return (
    <div>
      <div className="mypage-title">⭐️ My Profile</div>
      <div>
        <div id="profile-content">
          <ImageContainer
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userInput={userInput}
            setUserInput={setUserInput}
            editProfileBtn={editProfileBtn}
            setEditProfileBtn={setEditProfileBtn}
          />
          <ProfileContainer
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userInput={userInput}
            setUserInput={setUserInput}
            editProfileBtn={editProfileBtn}
            profileErr={profileErr}
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
