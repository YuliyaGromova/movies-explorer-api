/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');

const { NotFoundError } = require('../errors/not-found-err');

router.use('/users', auth, userRoutes);

router.use('/movies', auth, movieRoutes);

router.use('/', authRoutes);

router.all('/*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
