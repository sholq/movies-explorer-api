const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

require('dotenv').config();

const { PORT = 3000, NODE_ENV, PRODUCTION_DB } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? PRODUCTION_DB : 'mongodb://localhost:27017/bitfilmsdb')
  .then(() => console.log('Connected'))
  .catch((err) => console.log('Connection failed with - ', err));

const { routes } = require('./routes');

const { handleErrors } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log({ headers: req.headers, body: req.body });
  console.log('Запрос залогирован!');
  next();
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
