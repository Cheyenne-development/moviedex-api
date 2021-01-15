require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./error-handler');
const validateBearerToken = require('./validate-bearer-token');
const movieRouter = require('./movie-router');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());


app.use(validateBearerToken);

app.use(movieRouter);
app.use(errorHandler);

module.exports = app;