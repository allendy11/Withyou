const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const profileRouter = require('./routes/profile.js');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://withyou-final.s3-website.ap-northeast-2.amazonaws.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/mycard', cardRouter);
app.use('/profile', profileRouter);

module.exports = app;
