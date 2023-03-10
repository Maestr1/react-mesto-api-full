const Card = require('../models/card');
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation');
const ForbiddenError = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные о карточке'));
      } else {
        next(err);
      }
    });
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      next(new NotFoundError('Запрашиваемая карточка не найдена'));
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Нет прав для удаления этой карточки'));
        return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
          next(new NotFoundError('Запрашиваемая карточка не найдена'));
        })
        .then(() => res.send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные о карточке'));
      } else {
        next(err);
      }
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      next(new NotFoundError('Запрашиваемая карточка не найдена'));
    })
    .populate('owner')
    .populate('likes')
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные о карточке'));
      }
      next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      next(new NotFoundError('Запрашиваемая карточка не найдена'));
    })
    .populate('owner')
    .populate('likes')
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные о карточке'));
      }
      next(err);
    });
};
