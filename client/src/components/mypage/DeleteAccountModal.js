import React from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const DeleteAccountModal = ({
  setAccessToken,
  setIsLogin,
  setLoginBtn,
  setDeleteBtn,
  setLoadingSpinner,
}) => {
  const accessToken = sessionStorage.getItem("accessTokenSession");

  const deleteAccount = async (accessToken) => {
    await axios.get(`${process.env.REACT_APP_SERVER_LOCAL_URL}/user/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    sessionStorage.clear();
    setAccessToken("");
    setIsLogin(false);
    setLoginBtn(false);
    window.location.assign(process.env.REACT_APP_CLIENT_LOCAL_URL);
    setLoadingSpinner(false);
  };
  return (
    <div className="delete-modal-container">
      <p>
        <strong>
          <h3>탈퇴 후 회원정보가 모두 삭제됩니다.</h3>
        </strong>
        <h5>
          메일주소, 핸드폰 번호/기타 연락처 등 회원정보가 모두 삭제되며, 삭제된
          데이터는 복구되지 않습니다.
        </h5>
      </p>
      <div className="delete-modal-btn">
        <div>
          <button
            className="delete-modal-btn-button"
            onClick={() => deleteAccount(accessToken)}
          >
            확인
          </button>
        </div>
        <div>
          <button
            className="delete-modal-btn-button"
            onClick={() => setDeleteBtn(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
