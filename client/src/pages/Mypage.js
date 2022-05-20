import React, { useEffect, useState } from "react";
import "../css/Mypage.css";
import Footer from "../components/Footer";
import Myprofile from "../components/mypage/Myprofile";
import Mycard from "../components/mypage/Mycard";
import axios from "axios";
import { DeleteAccount } from "../components/mypage/DeleteAccount";
import { DeleteAccountModal } from "../components/mypage/DeleteAccountModal";
const Mypage = ({
  setLandingOn,
  setAccessToken,
  setIsLogin,
  setLoginBtn,
  loading,
  setLoading,
}) => {
  const [deleteBtn, setDeleteBtn] = useState(false);
  useEffect(() => {
    setLandingOn(false);
  }, []);
  return (
    <div id="mypage">
      <div id="profile">
        <Myprofile />
      </div>
      <div id="cards">
        <Mycard setLoading={setLoading} />
      </div>
      <Footer />
      <div id="delete-account">
        <DeleteAccount setDeleteBtn={setDeleteBtn} />
        {deleteBtn && (
          <DeleteAccountModal
            setDeleteBtn={setDeleteBtn}
            setAccessToken={setAccessToken}
            setIsLogin={setIsLogin}
            setLoginBtn={setLoginBtn}
          />
        )}
      </div>
    </div>
  );
};

export default Mypage;
