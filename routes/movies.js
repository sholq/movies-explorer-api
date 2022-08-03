const { validator, celebrate, Joi } = require('celebrate');

const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().required().min(2).max(30),
    nameRU: Joi.string().required().min(2).max(30),
    movieId: Joi.number().required(),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message('Поле thumbnail заполнено некорректно');
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message('Поле trailerLink заполнено некорректно');
    }),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message('Поле image заполнено некорректно');
    }),
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
