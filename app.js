var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
  var multer  = require('multer')
  var upload = multer({ dest: './public/images' })
var flash = require('connect-flash');
var mongodb = require('mongodb');
var moment = require('moment')
var expressValidator = require('express-validator')
var db = mongoose.connection;

var routes = require('./routes/index');
var posts = require('./routes/posts');
var categories = require('./routes/categories');

var app = express();

app.locals.moment = require('moment')

app.locals.truncateText = function(text,length){
    var truncateText = text.substring(0,length);
    return truncateText;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handle Sessions
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

//Validator
app.use(expressValidator());

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', routes);
app.use('/posts', posts);
app.use('/categories',categories);

app.get('/ty',(req,res) => {
    res.send("Hello")
}) 

app.listen(4000,()=> console.log("Server started on port 4000"))




