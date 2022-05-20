require("dotenv").config();
const axios = require("axios");
const { User } = require("../../../models");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bcryptSaltRounds = 12;

module.exports = (req, res) => {
  const { authorizationCode, type } = req.body;
  let url = "";
  let client_id = "";
  let client_secret = "";
  let state = "";
  const redirect_uri = "http://localhost:3000";
  const redirect_uri_S3 = "https://with-you.co.kr";
  if (type === "naver") {
    client_id = process.env.NAVER_CLIENT_ID;
    client_secret = process.env.NAVER_CLIENT_SECRET;
    state = "RANDOM_STATE";
    url = `https://nid.naver.com/oauth2.0/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&state=${state}&code=${authorizationCode}`;
    axios({ method: "GET", url }).then((resp) => {
      axios({
        method: "GET",
        url: "https://openapi.naver.com/v1/nid/me",
        headers: {
          Authorization: `Bearer ${resp.data.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(async (response) => {
        const { name, image, email } = response.data.response;
        const hashed = await bcrypt.hash("password", bcryptSaltRounds);
        const [userInfo, created] = await User.findOrCreate({
          where: { email },
          defaults: {
            username: name,
            password: hashed,
            mobile: "",
            image: image,
          },
        });
        if (!created) {
          const _userInfo = await User.findOne({ where: { email } });
          const _id = _userInfo.dataValues.id;
          const _email = _userInfo.dataValues.email;
          const accessToken = sign(
            { id: _id, email: _email },
            process.env.ACCESS_SECRET,
            { expiresIn: process.env.ACCESSEXPIREINDAYS }
          );
          const refreshToken = sign(
            { email: _email },
            process.env.REFRESH_SECRET,
            { expiresIn: process.env.REFRESHEXPIREINDAYS }
          );
          res
            .status(200)
            .cookie("refreshToken", refreshToken)
            .json({
              accessToken,
              userInfo: {
                id: _userInfo.dataValues.id,
                email: _userInfo.dataValues.email,
                username: _userInfo.dataValues.username,
                mobile: _userInfo.dataValues.mobile,
                image: _userInfo.dataValues.image,
              },
            });
        } else {
          const _userInfo = await User.findOne({ where: { email } });
          const _id = _userInfo.dataValues.id;
          const _email = _userInfo.dataValues.email;
          const accessToken = sign(
            { id: _id, email: _email },
            process.env.ACCESS_SECRET,
            { expiresIn: process.env.ACCESSEXPIREINDAYS }
          );
          const refreshToken = sign(
            { id: _id, email: _email },
            process.env.REFRESH_SECRET,
            { expiresIn: process.env.REFRESHEXPIREINDAYS }
          );
          res
            .status(201)
            .cookie("refreshToken", refreshToken)
            .json({
              accessToken,
              userInfo: {
                id: userInfo.dataValues.id,
                email: userInfo.dataValues.email,
                username: userInfo.dataValues.username,
                mobile: userInfo.dataValues.mobile,
                image: userInfo.dataValues.image,
              },
            });
        }
      });
    });
  } else if (type === "kakao") {
    client_id = process.env.KAKAO_CLIENT_ID;
    client_secret = process.env.KAKAO_CLIENT_SECRET;
    url = `https://kauth.kakao.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirect_uri_S3}`;
    axios({ method: "GET", url }).then((resp) => {
      axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${resp.data.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(async (response) => {
        const { profile, email } = response.data.kakao_account;
        const hashed = await bcrypt.hash("password", bcryptSaltRounds);
        const [userInfo, created] = await User.findOrCreate({
          where: { email },
          defaults: {
            username: profile.nickname,
            password: hashed,
            mobile: "",
            image: profile.profile_image_url,
          },
        });
        if (!created) {
          const _userInfo = await User.findOne({ where: { email } });
          const _id = _userInfo.dataValues.id;
          const _email = _userInfo.dataValues.email;
          const accessToken = sign(
            { id: _id, email: _email },
            process.env.ACCESS_SECRET,
            { expiresIn: process.env.ACCESSEXPIREINDAYS }
          );
          const refreshToken = sign(
            { id: _id, email: _email },
            process.env.REFRESH_SECRET,
            { expiresIn: process.env.REFRESHEXPIREINDAYS }
          );
          res
            .status(200)
            .cookie("refreshToken", refreshToken)
            .json({
              accessToken,
              userInfo: {
                id: _userInfo.dataValues.id,
                email: _userInfo.dataValues.email,
                username: _userInfo.dataValues.username,
                mobile: _userInfo.dataValues.mobile,
                image: _userInfo.dataValues.image,
              },
            });
        } else {
          const _userInfo = await User.findOne({ where: { email } });
          const _id = _userInfo.dataValues.id;
          const _email = _userInfo.dataValues.email;
          const accessToken = sign(
            { id: _id, email: _email },
            process.env.ACCESS_SECRET,
            { expiresIn: process.env.ACCESSEXPIREINDAYS }
          );
          const refreshToken = sign(
            { id: _id, email: _email },
            process.env.REFRESH_SECRET,
            { expiresIn: process.env.REFRESHEXPIREINDAYS }
          );
          res
            .status(201)
            .cookie("refreshToken", refreshToken)
            .json({
              accessToken,
              userInfo: {
                id: userInfo.dataValues.id,
                email: userInfo.dataValues.email,
                username: userInfo.dataValues.username,
                mobile: userInfo.dataValues.mobile,
                image: userInfo.dataValues.image,
              },
            });
        }
      });
    });
  } else if (type === "github") {
    const postData = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: authorizationCode,
    };
    axios({
      method: "POST",
      url: "https://github.com/login/oauth/access_token",
      headers: {
        accept: "application/json",
      },
      data: postData,
      withCredentials: true,
    }).then((resp) => {
      axios({
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
          Authorization: `token ${resp.data.access_token}`,
        },
      }).then(async (response) => {
        const { name, html_url } = response.data;
        const hashed = await bcrypt.hash("password", bcryptSaltRounds);
        const [userInfo, created] = await User.findOrCreate({
          where: { email: html_url },
          defaults: {
            username: name,
            password: hashed,
            mobile: "",
            image: "",
          },
        });
        if (!created) {
          const _userInfo = await User.findOne({ where: { email: html_url } });
          const _id = _userInfo.dataValues.id;
          const _email = _userInfo.dataValues.email;
          const accessToken = sign(
            { id: _id, email: _email },
            process.env.ACCESS_SECRET,
            { expiresIn: process.env.ACCESSEXPIREINDAYS }
          );
          const refreshToken = sign(
            { id: _id, email: _email },
            process.env.REFRESH_SECRET,
            { expiresIn: process.env.REFRESHEXPIREINDAYS }
          );
          res
            .status(200)
            .cookie("refreshToken", refreshToken)
            .json({
              accessToken,
              userInfo: {
                id: _userInfo.dataValues.id,
                email: _userInfo.dataValues.email,
                username: _userInfo.dataValues.username,
                mobile: _userInfo.dataValues.mobile,
                image: _userInfo.dataValues.image,
              },
            });
        } else {
          const _userInfo = await User.findOne({ where: { email: html_url } });
          const _id = _userInfo.dataValues.id;
          const _email = _userInfo.dataValues.email;
          const accessToken = sign(
            { id: _id, email: _email },
            process.env.ACCESS_SECRET,
            { expiresIn: process.env.ACCESSEXPIREINDAYS }
          );
          const refreshToken = sign(
            { id: _id, email: _email },
            process.env.REFRESH_SECRET,
            { expiresIn: process.env.REFRESHEXPIREINDAYS }
          );
          res
            .status(201)
            .cookie("refreshToken", refreshToken)
            .json({
              accessToken,
              userInfo: {
                id: userInfo.dataValues.id,
                email: userInfo.dataValues.email,
                username: userInfo.dataValues.username,
                mobile: userInfo.dataValues.mobile,
                image: userInfo.dataValues.image,
              },
            });
        }
      });
    });
  }
};
