const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  NODE_ENV,
  JWT_SECRET = 'secret-key',
} = process.env;
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation');
const LoginError = require('../errors/login');
const NotUniqueError = require('../errors/not-unique');

function updateUserInfoErrorHandler(res, err, next) {
  if (err.name === 'ValidationError') {
    next(new ValidationError('Переданы некорректные данные о пользователе'));
  }
  if (err.name === 'CastError') {
    next(new ValidationError('Передан некорректный ID пользователя'));
  } else {
    next(err);
  }
}

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError('Запрашиваемый пользователь не найден'));
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(new NotFoundError('Запрашиваемый пользователь не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные о пользователе'));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          const userObject = user.toObject();
          delete userObject.password;
          res.send(userObject);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные о пользователе'));
          }
          if (err.code === 11000) {
            next(new NotUniqueError('Введенный Email уже используется'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      updateUserInfoErrorHandler(res, err, next);
    });
};

module.exports.patchUserInfo = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      updateUserInfoErrorHandler(res, err, next);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new LoginError(err.message));
    });
};
