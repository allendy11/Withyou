const jwt = require('jsonwebtoken');

// const AUTH_ERROR = { message: 'Authentication Error' };
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = async (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return null;
  }
  const token = authorization.split(' ')[1];

  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (err) {
    return null;
  }
};
