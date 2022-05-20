const { verify } = require("jsonwebtoken");
const { user } = require("../../models");
module.exports = (req, res) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(" ")[1];
  const userInfo = verify(token, process.env.ACCESS_SECRET);
  if (!userInfo) {
    res.sendStatus(404);
  }
  const { username, mobile } = req.body;
  user.update(
    {
      username,
      mobile,
    },
    {
      where: { email: userInfo.email },
    }
  );
  res.sendStatus(201);
};
