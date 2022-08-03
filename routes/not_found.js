const notFoundRouter = require('express').Router();

const NotFoundError = require('../errors/not-found-error');

notFoundRouter.all('/*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = { notFoundRouter };
