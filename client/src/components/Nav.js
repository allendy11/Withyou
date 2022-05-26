import React from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import "../css/LandingPage.css";
import Login from "./login/Login";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const Nav = ({
  userInfo,
  setUserInfo,
  loginBtn,
  setLoginBtn,
  signupBtn,
  setSignupBtn,
  isLogin,
  setIsLogin,
  accessToken,
  setAccessToken,
  landingOn,
  setLandingOn,
  setLoading,
}) => {
  const handleClick = async (e) => {
    if (e.target.id === "login") {
      setLoginBtn(true);
      setSignupBtn(false);
      setLandingOn(false);
    } else if (e.target.id === "join") {
      setLoginBtn(true);
      setSignupBtn(true);
      setLandingOn(false);
    }
    if (e.target.id === "logout") {
      try {
        const data = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/user/signout`,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        sessionStorage.clear();
        setAccessToken("");
        setIsLogin(false);
        setLoginBtn(false);
        window.location.assign(process.env.REACT_APP_CLIENT_LOCAL_URL);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const navStyle = {
    color: `${landingOn ? "#f2f0ec" : "black"}`,
  };

  return (
    <>
      <div
        className="nav-container"
        style={{
          backgroundColor: `${landingOn ? "transparent" : "#f8eee7"}`,
          borderBottom: `${landingOn ? "transparent" : "solid 1px lightgray"}`,
          textShadow: `${landingOn ? "1px 1px 5px #212121" : "none"}`,
        }}
      >
        <div className="nav-left">
          <Link to="/">
            <div
              className="logo"
              style={navStyle}
              onClick={() => {
                setLandingOn(true);
                setLoginBtn(false);
              }}
            >
              Withyou
            </div>
          </Link>
        </div>
        {!isLogin ? (
          <div className="nav-box nav-right">
            <div id="login" onClick={handleClick} style={navStyle}>
              Login
            </div>
            <div id="join" onClick={handleClick} style={navStyle}>
              Join
            </div>
            <span className="burger_bar"></span>
          </div>
        ) : (
          <div className="nav-box nav-right">
            <div>
              <Link to="/mypage">
                <div onClick={() => setLandingOn(false)} style={navStyle}>
                  Mypage
                </div>
              </Link>
            </div>
            <div id="logout" onClick={handleClick} style={navStyle}>
              Logout
            </div>
          </div>
        )}
      </div>
      {loginBtn ? (
        <Login
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          loginBtn={loginBtn}
          setLoginBtn={setLoginBtn}
          signupBtn={signupBtn}
          setSignupBtn={setSignupBtn}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          setLandingOn={setLandingOn}
          setLoading={setLoading}
        />
      ) : null}
    </>
  );
};

export default Nav;
