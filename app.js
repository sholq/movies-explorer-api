const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', (err) => console.log('Connection failed with - ', err));

const { usersRouter } = require('./routes/users');
const { moviesRouter } = require('./routes/movies');
const { signInRouter } = require('./routes/signin');
const { signUpRouter } = require('./routes/signup');
// const { notFoundRouter } = require('./routes/not_found');

const auth = require('./middlewares/auth');
// const { handleErrors } = require('./middlewares/errors');
// const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log({ headers: req.headers, body: req.body });
  console.log('Запрос залогирован!');
  next();
});
app.use(requestLogger);
app.use(limiter);
// app.use(cors);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use(auth);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
// app.use('/', notFoundRouter);
app.use(errorLogger);
// app.use(errors());
// app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
