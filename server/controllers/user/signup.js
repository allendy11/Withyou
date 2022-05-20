const { User } = require('../../models');
const bcrypt = require('bcrypt');

const bcryptSaltRounds = 12;

module.exports = async (req, res) => {
  const { username, password, image, email, mobile } = req.body;
  const found = await User.findOne({
    where: { email },
  });
  if (found) {
    return res.send({ data: email, message: `${email} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userInfo = await User.create({
    username,
    password: hashed,
    image,
    email,
    mobile,
  });
  res.status(201).json({ userInfo, message: 'ok' });
};
