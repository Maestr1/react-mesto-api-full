const router = require('express').Router();

const { validateCardBody, validationCardId } = require('../middlewares/validatons');
const {
  getCards, createCard, removeCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validationCardId, removeCard);
router.put('/:cardId/likes', validationCardId, putLike);
router.delete('/:cardId/likes', validationCardId, deleteLike);

module.exports = router;
