const auth = require('../../middleware/auth');
module.exports = async (req, res) => {
  const authHeader = auth(req);
  if (!authHeader) {
    res.status(404).send({ message: 'not authrized' });
  }

  res.clearCookie('refreshToken');
  res.status(204).send({ message: 'logout success' });
};
