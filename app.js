var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');
var busboy = require('connect-busboy');

var web=require('./routes/web');

var app = express();

var modole = require('./module');
var proxy=require('./proxy');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/img/icon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store : new MongoStore({ url: config.db , ttl: 4 * 60 * 60}), //4 hour
  secret: 'action',
  name : 'action',
  resave:true,
  saveUninitialized:true,
}));
app.use(busboy({
  // immediate: true,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
}));

app.use('/', routes);
app.use('/users', users);
app.use('/action',require('./routes/action'));
app.use('/search',require('./routes/search'));
app.use('/type',require('./routes/type'));
app.use('/notification',require('./routes/notif'));
app.use('/web',web);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//run task
require('./task');

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * teswtestest中文
 */
function test() {

}
module.exports = app;
