const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'secret-key' } = process.env;
const LoginError = require('../errors/login');

function handleAuthError(next) {
  next(new LoginError('Требуется авторизация'));
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(next);
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    handleAuthError(next);
    return;
  }
  req.user = payload;
  next();
};
