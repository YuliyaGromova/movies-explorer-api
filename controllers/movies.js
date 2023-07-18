// getMovies, deleteMovie, addMovie
const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/not-found-err');
const { ForbiddenError } = require('../errors/forbidden-err');

const getMovies = async (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.Id)
    .orFail(() => new NotFoundError())
    .then((item) => {
      if (String(item.owner) === String(req.user._id)) {
        Movie.deleteOne(item)
          .orFail(() => new NotFoundError())
          .then(() => res.status(200).send({ message: 'Удаление выполнено' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
    })
    .catch(() => next(new NotFoundError()));
};

const addMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  Movie.create({
    ...req.body,
  })
    .then((movie) => {
      res.send(movie);
      // console.log(movie);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
