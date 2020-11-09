const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const auth = require('./auth/authentification')
const morgan = require('morgan');
const i18next = require('./i18n');
const i18nextMiddleware = require('i18next-express-middleware');

const userRouter = require('./routes/users');
const lobbiesRouter = require('./routes/lobbies');

const app = express();

morgan.token('host', function(req, res) {
  return req.hostname;
});

app.use(auth.authenticate)

app.use(i18nextMiddleware.handle(i18next));
/*app.use(
    middleware.handle(i18next, {
      ignoreRoutes: ["/foo"], // or function(req, res, options, i18next) { /* return true to ignore  }
      removeLngFromUrl: false
    })
);*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(morgan(':method :host :status :res[content-length] - :response-time ms'))

app.get('/users/:name', auth.isAuthenticated, userRouter)
app.post('/users/refresh', auth.isAuthenticated, userRouter)
app.use('/users', userRouter);
app.use('/lobbies', auth.isAuthenticated, lobbiesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
