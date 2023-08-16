/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  //   country — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: true,
    default: 'планета Земля',
  },
  // director — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: true,
    default: 'Не известен',
  },
  // duration — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  // year — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: true,
    default: '2000',
  },
  // description — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: true,
    default: 'Описание фильма',
  },
  // image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image: {
    type: String,
    required: true,
    // default: 'Описание фильма'
    validate: [validator.isURL, 'Вы ввели некорректную ссылку'],
  },
  // trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailerLink: {
    type: String,
    required: true,
    // default: 'Описание фильма'
    validate: [validator.isURL, 'Вы ввели некорректную ссылку'],
  },
  // thumbnail — миниатюрное изображение постера к фильму.
  // Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail: {
    type: String,
    required: true,
    // default: 'Описание фильма'
    validate: [validator.isURL, 'Вы ввели некорректную ссылку'],
  },
  // owner — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer.
  // Обязательное поле в формате number.
  movieId: {
    type: Number,
    required: true,
  },
  // nameRU — название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: true,
    // validate: { // опишем свойство validate
    //   validator(v) {
    //     return validator.isAlphanumeric(v, ['ru-RU'], { ignore: ' -!.,:;?()[]"+@$' });
    //   },
    //   message: 'Название фильма должно быть на русском языке',
    // },
  },
  // nameEN — название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
    // validate: {
    //   validator(v) {
    //     return validator.isAlphanumeric(v, ['en-US'], { ignore: ' -!.,:;?()[]"+@$' });
    //   },
    //   message: 'Название фильма должно быть на английском языке',
    // },
  },
});

module.exports = mongoose.model('movie', movieSchema);
