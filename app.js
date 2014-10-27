var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');
var mysql = require('mysql');

var routes = require('./routes/index');
var affiliate = require('./routes/rest/affiliate');
var requestTest = require('./routes/rest/requestTest');

var badge = require('./routes/membership/badge');
var member = require('./routes/membership/member');

var mysql = require('mysql');

var dbConfig = {
  host:'10.253.2.53',
  port: 3306,
  user: 'openapi',
  password:'!api!',
  database:'openapi'
};

global.dbcon = mysql.createConnection(dbConfig);

i18n.configure({
  locales: ['en', 'ko'],
  defaultLocale: 'ko',
  cookie: 'locale',
  directory: __dirname + '/locales'
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use('/', routes);
app.use('/rest/affiliate', affiliate);
app.use('/rest/requestTest', requestTest);

app.use('/member/badge', badge);
app.use('/member/member', member);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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

function handleDisconnect(db) {
  db.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;
    console.error('> Re-connecting lost MySQL connection: ' + error.stack);

    global.dbcon = mysql.createConnection(dbConfig);
    handleDisconnect(global.dbcon);
    global.dbcon.connect();
    console.log("DB Reconnect");
  });
}

module.exports = app;
