const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESSEXPIREINDAYS = process.env.ACCESSEXPIREINDAYS;
const REFRESHEXPIREINDAYS = process.env.REFRESHEXPIREINDAYS;

module.exports = async (req, res) => {
  const userInfo = await User.findOne({
    where: { email: req.body.email },
  });
  if (!userInfo) {
    return res.status(401).send({ message: "Invalid email" });
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    userInfo.password
  );
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const { id, username, mobile, email, image } = userInfo.dataValues;
  const accessToken = createAccessToken({ id, email });
  const refreshToken = createRefreshToken({ id, email });
  res
    .status(200)
    .cookie("refreshToken", refreshToken)
    .json({ accessToken, userInfo: { id, username, mobile, email, image } });
};

function createAccessToken({ id, email }) {
  return jwt.sign({ id, email }, ACCESS_SECRET, {
    expiresIn: ACCESSEXPIREINDAYS,
  });
}
function createRefreshToken({ id, email }) {
  return jwt.sign({ id, email }, REFRESH_SECRET, {
    expiresIn: REFRESHEXPIREINDAYS,
  });
}
