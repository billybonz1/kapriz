// Imports all the modules needed
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Used to connect to the MongoDB database
var mongo = require('mongodb');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Define the directory with the views and to use Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define what route files to use being routes/index.js for /
// routes/users.js for /users
// The route files then render the page
app.use('/', routes);
app.use('/users', users);


module.exports = app;