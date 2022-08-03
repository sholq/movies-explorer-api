const { celebrate, Joi } = require('celebrate');

const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const { urlRegEx } = require('../regex/regex');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().required().min(2).max(30),
    nameRU: Joi.string().required().min(2).max(30),
    movieId: Joi.number().required(),
    thumbnail: Joi.string().required().regex(urlRegEx),
    trailerLink: Joi.string().required().regex(urlRegEx),
    image: Joi.string().required().regex(urlRegEx),
    description: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
  }),
}), createMovie);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = { moviesRouter };
