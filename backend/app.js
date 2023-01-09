const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { validateSignUp, validateSignIn } = require('./middlewares/validatons');
const { NOT_FOUND_ERR_STATUS } = require('./utils/constants');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.set('runValidators', true);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use('/signin', validateSignIn, login);
app.use('/signup', validateSignUp, createUser);

app.use('/', auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

// Обработка ошибки 404
app.use((req, res, next) => {
  res.status(NOT_FOUND_ERR_STATUS)
    .send({ message: 'Не правильный путь' });
  next();
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
