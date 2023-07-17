/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { regURL } = require('../utils/validate-url-err');
const { regRU, regEN } = require('../utils/validate-aipha-err');

const { getMovies, deleteMovie, addMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regURL),
    trailerLink: Joi.string().required().pattern(regURL),
    nameRU: Joi.string().required().pattern(regRU),
    nameEN: Joi.string().required().pattern(regEN),
    thumbnail: Joi.string().required().pattern(regURL),
    movieId: Joi.number().required(),
  }),
}), addMovie);

router.delete('/:Id', celebrate({
  params: Joi.object().keys({
    Id: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
