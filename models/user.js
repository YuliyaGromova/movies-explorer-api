/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Новый пользователь',
    required: [true, "Поле 'Name' обязательное"],
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "Поле 'Email' обязательное"],
    unique: true,
    validate: [validator.isEmail, 'Вы ввели некорректный email'],
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
});

const User = mongoose.model('user', userSchema);
module.exports = { User };
