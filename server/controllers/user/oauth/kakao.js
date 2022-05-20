const axios = require("axios");
module.exports = (req, res) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(" ")[1];
  axios({
    method: "GET",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((resp) => {
    const { profile, email } = resp.data.kakao_account;

    res.send({
      username: profile.nickname,
      email: email,
      mobile: "",
      image: profile.profile_image_url,
    });
  });
};
