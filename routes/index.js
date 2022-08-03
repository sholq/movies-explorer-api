const routes = require('express').Router();

const { signInRouter } = require('./signin');
const { signUpRouter } = require('./signup');
const { usersRouter } = require('./users');
const { moviesRouter } = require('./movies');
const { notFoundRouter } = require('./not_found');

const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');

routes.use(cors);
routes.use('/signin', signInRouter);
routes.use('/signup', signUpRouter);
routes.use(auth);
routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);
routes.use('/', notFoundRouter);

module.exports = { routes };
