const axios = require("axios");
module.exports = (req, res) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(" ")[1];
  axios({
    method: "GET",
    url: "https://openapi.naver.com/v1/nid/me",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((resp) => {
    const { name, image, email, mobile } = resp.data.response;
    res.send({
      username: name,
      email,
      mobile,
      image,
    });
  });
};
