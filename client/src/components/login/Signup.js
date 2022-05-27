import React, { useState } from "react";
import "../../css/login/Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

axios.default.withCredentials = true;

const Signup = ({
  setLoginBtn,
  setIsLogin,
  setAccessToken,
  setSignupBtn,
  setLandingOn,
}) => {
  const [errMessage, setErrMessage] = useState("");
  const [errModal, setErrModal] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    mobile: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUserInput({
        ...userInput,
        username: e.target.value,
      });
    } else if (e.target.name === "email") {
      setUserInput({
        ...userInput,
        email: e.target.value,
      });
    } else if (e.target.name === "password") {
      setUserInput({
        ...userInput,
        password: e.target.value,
      });
    } else if (e.target.name === "password2") {
      setUserInput({
        ...userInput,
        password2: e.target.value,
      });
    }
  };

  const handleClick = async (e) => {
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (
      userInput.username === "" ||
      userInput.email === "" ||
      userInput.password === ""
    ) {
      setErrModal(true);
      setErrMessage("모든 항목은 필수입니다");
    } else if (exptext.test(userInput.email) === false) {
      setErrModal(true);
      setErrMessage("이메일 형식이 올바르지 않습니다");
    } else if (userInput.password !== userInput.password2) {
      setErrModal(true);
      setErrMessage("비밀번호가 일치하지 않습니다");
    } else {
      if (!errModal) {
        try {
          // 회원가입
          const data = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/user/signup`,
            data: userInput,
          });
          // 회원가입 후 자동 로그인
          const tokenData = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/user/signin`,
            data: { email: userInput.email, password: userInput.password },
          });
          const { accessToken } = tokenData.data;

          sessionStorage.setItem("isLoginSession", true);
          sessionStorage.setItem("accessTokenSession", accessToken);
          setIsLogin(true);
          setAccessToken(accessToken);
          setLoginBtn(false);
          window.location.assign(`${process.env.REACT_APP_CLIENT_LOCAL_URL}`);
        } catch (err) {
          if (err.request.status === 401) {
            // 회원가입시, 이메일 중복되는 경우
            setIsLogin(false);
            setErrModal(true);
            setErrMessage("이미 존재하는 이메일 입니다");
            setUserInput({
              username: "",
              email: "",
              password: "",
              password2: "",
              mobile: "",
              image: "",
            });
          } else {
            setErrModal(true);
            setErrMessage("모든 항목은 필수예요");
          }
        }
      }
    }
  };

  return (
    <div className="signup-left-box">
      <Link to="/">
        <div className="signup-title">
          <div
            onClick={() => {
              setLandingOn(true);
              setLoginBtn(false);
              setSignupBtn(false);
            }}
          >
            Withyou
          </div>
        </div>
      </Link>
      <div className="signup-input">
        <div>계정 만들기</div>

        <div className="signup-input-box">
          <label>이메일</label>
          <input
            onFocus={() => setErrModal(false)}
            type="email"
            name="email"
            value={userInput.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="signup-input-box">
          <label>이름</label>
          <input
            onFocus={() => setErrModal(false)}
            type="text"
            name="username"
            value={userInput.username}
            onChange={handleChange}
            placeholder="유저이름을 입력하세요"
          />
        </div>
        <div className="signup-input-box">
          <label>비밀번호</label>
          <input
            onFocus={() => setErrModal(false)}
            id="password"
            type="password"
            name="password"
            value={userInput.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="signup-input-box">
          <label>비밀번호 확인</label>
          <input
            onFocus={() => setErrModal(false)}
            id="password2"
            type="password"
            name="password2"
            value={userInput.password2}
            onChange={handleChange}
            placeholder="다시 한번 더 입력하세요"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
        </div>
        {errModal && (
          <div className="signup-errMsg">
            <div>{errMessage}</div>
          </div>
        )}
        <div className="signup-button-box">
          <input
            type="submit"
            className="signup-btn button"
            value="시작하기"
            onClick={handleClick}
          ></input>
          <div className="signup-login-container">
            <div className="signup-login">
              <span id="text">이미 가입하셨나요?</span>
              <span className="button" onClick={(e) => setSignupBtn(false)}>
                로그인
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
