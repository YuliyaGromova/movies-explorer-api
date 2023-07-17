/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const { errors } = require('celebrate');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL } = process.env;
const app = express();
app.use(cors({ origin: ['http://localhost:3001', 'https://gromova.students.nomoreparties.sbs'], credentials: true, maxAge: 3600 }));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('OK'));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT);
});
