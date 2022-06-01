import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LandingPage from "./pages/LandingPage";
import Mypage from "./pages/Mypage";
import Nav from "./components/Nav";
import axios from "axios";
import "./App.css";
import Spinner from "./components/loading/Spinner";
import { spinnerOn, spinnerOff } from "./components/loading/SpinnerSwitch";
import SuccessMessage from "../src/components/editpage/canvas/modals/SuccessMessage";
import ClientErrorMessage from "../src/components/editpage/canvas/modals/ClientErrorMessage";
import ServerErrorMessage from "../src/components/editpage/canvas/modals/ServerErrorMessage";
import ConfirmMessage from "./components/editpage/canvas/modals/ConfirmMessage";
import dotenv from "dotenv";
dotenv.config();

axios.default.withCredentials = true;

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  const [signupBtn, setSignupBtn] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    mobile: "",
  });
  const [landingOn, setLandingOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isClientError, setIsClientError] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isConfirmMessage, setIsConfirmMessage] = useState(false);
  const [itemStates, setItemStates] = useState([]);
  const getAccessToken = (authorizationCode, loginType) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/user/${loginType}`,
      data: { authorizationCode: authorizationCode },
    }).then((resp) => {
      const { accessToken } = resp.data;
      setIsLogin(true);
      sessionStorage.setItem("isLoginSession", isLogin);
      sessionStorage.setItem("accessTokenSession", accessToken);
    });
  };
  useEffect(() => {
    const isLoginSession = sessionStorage.getItem("isLoginSession");
    const accessTokenSession = sessionStorage.getItem("accessTokenSession");
    if (isLoginSession) {
      setIsLogin(isLoginSession);
      spinnerOff(setLoading);
    }
    if (accessTokenSession) {
      setAccessToken(accessTokenSession);
    }
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (!isLoginSession && authorizationCode) {
      spinnerOn(setLoading);

      const loginType = sessionStorage.getItem("loginType");
      getAccessToken(authorizationCode, loginType);
      // window.location.assign("http://localhost:3000");
    }
  }, [isLogin]);

  return (
    <Router>
      <Nav
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        loginBtn={loginBtn}
        setLoginBtn={setLoginBtn}
        signupBtn={signupBtn}
        setSignupBtn={setSignupBtn}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        landingOn={landingOn}
        setLandingOn={setLandingOn}
        setLoading={setLoading}
      />
      {isSuccessMessage && (
        <SuccessMessage
          setIsSuccessMessage={setIsSuccessMessage}
          setIsMessage={setIsMessage}
        />
      )}
      {isClientError && (
        <ClientErrorMessage
          setIsClientError={setIsClientError}
          setIsMessage={setIsMessage}
        />
      )}
      {isServerError && (
        <ServerErrorMessage
          setIsServerError={setIsServerError}
          setIsMessage={setIsMessage}
        />
      )}
      {isConfirmMessage && (
        <ConfirmMessage
          setIsConfirmMessage={setIsConfirmMessage}
          setIsMessage={setIsMessage}
          setItemStates={setItemStates}
        />
      )}

      <div className="spinner" style={{ zIndex: "1000" }}>
        {loading || isMessage ? <Spinner /> : null}
      </div>
      <Switch>
        <Route exact={true} path="/">
          {!loginBtn && (
            <LandingPage landingOn={landingOn} setLandingOn={setLandingOn} />
          )}
        </Route>
        <Route path="/editpage">
          {!loginBtn && (
            <EditPage
              setLandingOn={setLandingOn}
              isLogin={isLogin}
              loading={loading}
              setLoading={setLoading}
              setIsMessage={setIsMessage}
              setIsClientError={setIsClientError}
              setIsSuccessMessage={setIsSuccessMessage}
              setIsServerError={setIsServerError}
              setIsConfirmMessage={setIsConfirmMessage}
              itemStates={itemStates}
              setItemStates={setItemStates}
            />
          )}
        </Route>
        <Route path="/mypage">
          <Mypage
            setLandingOn={setLandingOn}
            setAccessToken={setAccessToken}
            setIsLogin={setIsLogin}
            setLoginBtn={setLoginBtn}
            loading={loading}
            setLoading={setLoading}
          />
        </Route>
      </Switch>
    </Router>
  );
}
