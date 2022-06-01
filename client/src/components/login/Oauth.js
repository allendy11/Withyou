import React from "react";
// import naver from "../../images/naver.png";
import kakao from "../../images/kakao.png";
import github from "../../images/github.png";
import dotenv from "dotenv";
dotenv.config();

const Oauth = () => {
  // const naverLogin = (e) => {
  //   const client_id = "uFXw6VGES6r8XT7wm80Q";
  //   const state = "RANDOM_STATE";
  //   const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${process.env.REACT_APP_CLIENT_LOCAL_URL}&state=${state}`;
  //   // setUserInfo({ ...userInfo, type: "naver" });
  //   // sessionStorage.setItem("userInfoSession", JSON.stringify(userInfo));
  //   sessionStorage.setItem("loginType", "naver");
  //   window.location.assign(api_url);
  // };

  const kakaoLogin = (e) => {
    const client_id = "590eb89ea8da97055898d61a832ed657";
    const api_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${process.env.REACT_APP_CLIENT_LOCAL_URL}`;
    // setUserInfo({ ...userInfo, type: "kakao" });
    // sessionStorage.setItem("userInfoSession", JSON.stringify(userInfo));
    sessionStorage.setItem("loginType", "kakao");
    window.location.assign(api_url);
  };

  const githubLogin = () => {
    const GITHUB_LOGIN_URL =
      "https://github.com/login/oauth/authorize?client_id=5b0d60296b7af761c5d5";
    sessionStorage.setItem("loginType", "github");
    window.location.assign(GITHUB_LOGIN_URL);
  };

  return (
    <div className="login-oauth">
      <div className="oauth-box">
        <div>
          <img id="github-logo" alt="logo" src={github}></img>
        </div>
        <div onClick={githubLogin} className="oauth-name button">
          깃허브 로그인
        </div>
      </div>
      {/* <div className="oauth-box">
        <div>
          <img id='naver-logo' src={naver} alt='naver'></img>
        </div>
        <div className='oauth-name button' onClick={naverLogin}>
          네이버 로그인
        </div>
      </div> */}
      <div className="oauth-box">
        <div>
          <img id="kakao-logo" src={kakao} alt="kakao"></img>
        </div>
        <div className="oauth-name button" onClick={kakaoLogin}>
          카카오 로그인
        </div>
      </div>
    </div>
  );
};

export default Oauth;
