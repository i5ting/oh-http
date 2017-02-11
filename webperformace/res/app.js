var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var compression = require('compression')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// compress all responses
app.use(compression())

// server-sent event stream
// app.get('/events', function (req, res) {
//   res.setHeader('Content-Type', 'text/event-stream')
//   res.setHeader('Cache-Control', 'no-cache')
//
//   // send a ping approx every 2 seconds
//   var timer = setInterval(function () {
//     res.write('data: ping\n\n')
//
//     // !!! this is the important part
//     res.flush()
//   }, 2000)
//
//   res.on('close', function () {
//     clearInterval(timer)
//   })
// })
    
// etag
    
// app.set('etag', false);


// cookie

app.get('/cookie', function (req, res, next) {
    res.cookie('name', 'tobi');
    res.end("cookie demo")
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var options = {
  // dotfiles: 'ignore',
  // etag: true,
  // extensions: ['css', 'js', 'html'],
  // index: false,
  // maxAge: '1d',
  // redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static(path.join(__dirname, 'public'), options));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
