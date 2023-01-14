const router = require('express')
  .Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const {
  validateSignIn,
  validateSignUp,
} = require('../middlewares/validatons');
const {
  login,
  createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signin', validateSignIn, login);
router.use('/signup', validateSignUp, createUser);

router.use('/', auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

// Обработка ошибки 404
router.use((req, res, next) => {
  next(new NotFoundError('Не правильный путь'));
});

module.exports = router;
