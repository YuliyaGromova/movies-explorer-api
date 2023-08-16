// updateUserInfo, getUserInfo
// залогиниться, зарегистрироваться

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NotFoundError } = require('../errors/not-found-err');
const { UniqueError } = require('../errors/unique-err');
const { ValidationError } = require('../errors/validation-err');
const { UnauthorizedError } = require('../errors/unauthorized-err');

const { User } = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) { // 409
        next(new UniqueError());
      } else if (err.name === 'ValidationError' || err.name === 'CastError') { // 400
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      next(new UnauthorizedError('Не верный логин или пароль'));
    })
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((matched) => {
          // console.log(matched);
          if (!matched) {
            // хеши не совпали — отклоняем промис
            next(new UnauthorizedError('Не верный логин или пароль'));
          } else {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
            res.send({ token });
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  req.params.id = req.user._id;
  User.findById(req.params.id)
    .orFail(() => new NotFoundError())
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) { // 409
        next(new UniqueError());
      } else if (err.name === 'ValidationError' || err.name === 'CastError') { // 400
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateUserInfo,
  login,
  getUserInfo,
};
