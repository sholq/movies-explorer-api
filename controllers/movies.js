const { Movie } = require('../models/movies');

const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    nameEN: req.body.nameEN,
    nameRU: req.body.nameRU,
    movieId: req.body.movieId,
    thumbnail: req.body.thumbnail,
    image: req.body.image,
    description: req.body.description,
    year: req.body.year,
    duration: req.body.duration,
    director: req.body.director,
    country: req.body.country,
    owner: req.user._id,
  })
    .then(({
      _id,
      nameEN,
      nameRU,
      movieId,
      thumbnail,
      image,
      description,
      year,
      duration,
      director,
      country,
    }) => {
      res.send({
        _id,
        nameEN,
        nameRU,
        movieId,
        thumbnail,
        image,
        description,
        year,
        duration,
        director,
        country,
        owner: { _id: req.user._id },
      });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .populate('owner')
    .then((movie) => {
      if (String(movie.owner._id) === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId);
      }
      throw new AccessError('Ошибка доступа');
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};
