const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.set('runValidators', true);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
