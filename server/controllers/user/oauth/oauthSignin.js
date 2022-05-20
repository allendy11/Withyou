const { User } = require('../../../models');
module.exports = async (req, res) => {
  const { email, username, mobile, image } = req.body;
  const userInfo = await User.create({
    username,
    image,
    email,
    mobile,
  });
  res.status(201).json(userInfo);
};
