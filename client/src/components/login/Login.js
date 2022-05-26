import React, { useState } from "react";
import "../../css/login/Login.css";
import { Link } from "react-router-dom";
import loginModal from "../../images/signup.jpg";
import Signup from "../login/Signup";
import Oauth from "../login/Oauth";
import axios from "axios";
import { loadingOn, loadingOff } from "../loading/Loading";
import dotenv from "dotenv";
dotenv.config();
axios.default.withCredentials = true;

const Login = ({
  setIsLogin,
  setLoginBtn,
  signupBtn,
  setSignupBtn,
  setAccessToken,
  setLandingOn,
  setLoading,
}) => {
  const [inputErr, setInputErr] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async (e) => {
    try {
      await loadingOn(setLoading);
      const data = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/user/signin`,
        data: userInput,
        // 여기서 then을 걸어서, 정상적으로 받아오면, 다음 작업을 들어가는 식이 맞지 않나...? 잘 모르겠음
      }).catch(async (err) => {
        await loadingOff(setLoading);
        setInputErr(true);
      });
      const { accessToken } = data.data;
      sessionStorage.setItem("isLoginSession", true);
      sessionStorage.setItem("accessTokenSession", accessToken);
      setAccessToken(accessToken);
      setLoginBtn(false);
      setIsLogin(true);
      await loadingOff(setLoading);
      window.location.assign(`${process.env.REACT_APP_CLIENT_LOCAL_URL}`);
    } catch (err) {
      setInputErr(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div
          className="close-btn button"
          onClick={() => {
            setSignupBtn(false);
            setLoginBtn(false);
            setLandingOn(true);
          }}
        >
          X
        </div>
        {signupBtn ? (
          <Signup
            setLoginBtn={setLoginBtn}
            setSignupBtn={setSignupBtn}
            setIsLogin={setIsLogin}
            setAccessToken={setAccessToken}
            setLandingOn={setLandingOn}
          />
        ) : (
          <div className="login-left-box">
            <Link to="/">
              <div
                className="login-title modal-title"
                onClick={() => {
                  setLandingOn(true);
                  setLoginBtn(false);
                }}
              >
                Withyou
              </div>
            </Link>
            <div className="login-input">
              <div>계정 로그인</div>
              <div className="login-input-box">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="이메일"
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleClick();
                    }
                  }}
                ></input>
                <label>이메일</label>
              </div>
              <div className="login-input-box">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleClick();
                    }
                  }}
                ></input>
                <label>비밀번호</label>
              </div>
              {inputErr ? (
                <div className="login-errMsg">
                  <div>아이디 또는 비밀번호가 잘못 입력 되었습니다. </div>
                  <div>아이디와 비밀번호를 정확히 입력해 주세요.</div>
                </div>
              ) : null}
              <div className="login-button-box">
                <div className="login-btn button" onClick={handleClick}>
                  로그인
                </div>
                <div id="text" className="login-text">
                  {/* <div className="login-forgot-password login-text-box">
                    <span className="button">암호를 잊어버리셨나요?</span>
                  </div> */}
                  <div className="login-signup login-text-box">
                    <span>처음 오셨나요?</span>
                    <span
                      className="button"
                      onClick={(e) => {
                        setSignupBtn(true);
                      }}
                    >
                      가입하기
                    </span>
                  </div>
                </div>
              </div>
              <Oauth setLoading={setLoading} />
            </div>
          </div>
        )}
        <div className="login-right-box">
          <img src={loginModal} alt="loginModal-img"></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
