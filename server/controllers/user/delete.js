const auth = require('../../middleware/auth');
const { User } = require('../../models');

module.exports = async (req, res) => {
  const authHeader = await auth(req);
  const { email } = authHeader;
  if (!authHeader) {
    res.status(400).send({ data: null, message: 'invalid access token' });
  }
  await User.destroy({
    where: {
      email,
    },
  });
  res.status(204).send({ message: 'delete account success!!' });
};
