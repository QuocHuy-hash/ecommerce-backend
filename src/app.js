var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require('compression');
const swaggerDocs = require('./utils/swagger');
const cors = require('cors');
require('dotenv').config();
var app = express();


// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compression());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var corsOptions = {
  origin: ['http://localhost.3055', '*', 'http:127.0.0.1:3055'],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
// Swagger setup
swaggerDocs.swaggerDocs(app, 3055);
//router
app.use('/', require('./routes/index'));



// catch 404 and forward to error handler
app.use(function (error, req, res, next) {
  next(createError(404));
  console.log(error.message)
});

// init handle exceptions
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404
  next(error);
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Service Error'
  })
})

module.exports = app;
