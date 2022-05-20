const { User } = require("../../models");
const { verify } = require("jsonwebtoken");
const auth = require("../../middleware/auth");

module.exports = {
  getProfile: async (req, res) => {
    const authHeader = await auth(req);
    if (!authHeader) {
      res.status(400).send({ data: null, message: "invalid access token" });
    }
    const userInfo = await User.findOne({
      where: {
        email: authHeader.email,
      },
    });
    res.send({
      email: userInfo.email,
      username: userInfo.username,
      mobile: userInfo.mobile,
      image: userInfo.image,
    });
  },
  editProfile: async (req, res) => {
    const authHeader = await auth(req);
    if (!authHeader) {
      res.status(400).send({ data: null, message: "invalid access token" });
    }
    await User.update(
      {
        username: req.body.username,
        mobile: req.body.mobile,
      },
      { where: { email: authHeader.email } }
    );
    const userInfo = await User.findOne({ where: { email: authHeader.email } });
    res.send({
      email: userInfo.email,
      username: userInfo.username,
      mobile: userInfo.mobile,
    });
  },
};
