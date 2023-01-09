const { celebrate } = require('celebrate');
const Joi = require('joi');
const mongoose = require('mongoose');
const {
  isEmail,
  isURL,
} = require('validator');

module.exports.validateCardBody = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени карточки не должно быть менее 2 символов',
          'string.max': 'В имени карточки не должно быть более 30 символов',
          'any.required': 'Необходимо ввести имя карточки',
        }),
      link: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message('Введена некорректная ссылка');
        })
        .messages({
          'any.required': 'Необходимо ввести ссылку на изображение',
        }),
    }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени не должно быть менее 2 символов',
          'string.max': 'В имени не должно быть более 30 символов',
        }),
      about: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В описании не должно быть менее 2 символов',
          'string.max': 'В описании не должно быть более 30 символов',
        }),
      avatar: Joi.string()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message('Введена некорректная ссылка на аватар');
        }),
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isEmail(value)) {
            return value;
          }
          return helpers.message('Введен некорректный Email');
        })
        .messages({
          'any.required': 'Необходимо ввести Email',
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Пароль не может быть пустым',
          'any.required': 'Необходимо ввести пароль',
        }),
    })
    .unknown(true),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isEmail(value)) {
            return value;
          }
          return helpers.message('Введен некорректный Email');
        })
        .messages({
          'any.required': 'Необходимо ввести Email',
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Пароль не может быть пустым',
          'any.required': 'Необходимо ввести пароль',
        }),
    }),
});

module.exports.validatePatchUserInfo = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени не должно быть менее 2 символов',
          'string.max': 'В имени не должно быть более 30 символов',
        }),
      about: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В описании не должно быть менее 2 символов',
          'string.max': 'В описании не должно быть более 30 символов',
        }),
      avatar: Joi.string()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message('Введена некорректная ссылка на аватар');
        }),
    }),
});

module.exports.validatePatchUserAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message('Введена некорректная ссылка на аватар');
        }),
    }),
});

module.exports.validationGetUser = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (mongoose.Types.ObjectId.isValid(value)) {
            return value;
          }
          return helpers.message('Передан некорректный ID пользователя');
        })
        .messages({
          'any.required': 'Переданы некорректные данные о пользователе',
        }),
    }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (mongoose.Types.ObjectId.isValid(value)) {
            return value;
          }
          return helpers.message('Передан некорректный ID карточки');
        })
        .messages({
          'any.required': 'Не переданы данные о карточке',
        }),
    }),
});
