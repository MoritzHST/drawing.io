const WebSocketHandler = require("./WebSocketHandler");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const auth = require('./auth/authentification')
const morgan = require('morgan');
const i18next = require('./i18n');
const i18nextMiddleware = require('i18next-express-middleware');
const http = require("http");
const index = require("./routes/index")
const socketIo = require("socket.io")
const cors = require('cors')

const userRouter = require('./routes/users');
const lobbiesRouter = require('./routes/lobbies');

const app = express();
const server = http.createServer(app);

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
app.get('/', cors(), (req, res) => {
  res.send('<h1>Hello world</h1>');
});
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

const io = socketIo(server, {
  cors: {
    origin: "*"
  }
})

let websocketHandler = new WebSocketHandler(io)

server.listen(process.env.PORT || 8999, () => {
  console.log(`HTTP-WS-Server started on port ${server.address().port}`);
});

module.exports = app;
