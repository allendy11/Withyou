require("dotenv").config();
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");

module.exports = async (req, res) => {
  const authorization = req.headers["authorization"];
  const accessToken = authorization.split(" ")[1];
  const resp = await axios.get("https://api.github.com/user", {
    headers: {
      authorization: `token ${accessToken}`,
    },
  });
  const { name, html_url } = resp.data;
  res.send({
    username: name,
    email: html_url,
    mobile: "",
    image: "",
  });
};
