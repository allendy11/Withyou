import React from "react";

const ProfileContainer = ({
  userInfo,
  setUserInfo,
  userInput,
  setUserInput,
  editProfileBtn,
}) => {
  const { username, email, mobile } = userInfo;

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };
  return (
    <div className="userinfo">
      <div id="e-mail" className="uerInfo-row">
        <span>💫 email : </span>
        <span>{email}</span>
      </div>
      <div id="username" className="uerInfo-row">
        <span>💫 username : </span>
        {editProfileBtn ? (
          <input
            id="username"
            type="text"
            value={userInput.username}
            onChange={handleChange}
          ></input>
        ) : (
          <span>{username}</span>
        )}
      </div>
      <div id="mobile" className="uerInfo-row">
        <span>💫 mobile : </span>
        {editProfileBtn ? (
          <input
            id="mobile"
            type="text"
            value={userInput.mobile}
            onChange={handleChange}
          ></input>
        ) : (
          <span>{mobile}</span>
        )}
      </div>
    </div>
  );
};

export default ProfileContainer;
