var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); 
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); 
var cartRouter = require('./routes/cart'); 
var wishlistRouter = require('./routes/wishlist');

var app = express();
app.use(cors());
const buildPath = path.join(__dirname, '.', 'public', 'build');
app.use(express.static(path.join(buildPath)));


mongoose.connect('mongodb+srv://dchinneluka1:okfCEaalLLSFiurK@cluster0.3j5qw.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log("MongoDB connection error:", err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productsRouter); 
app.use('/api/cart', cartRouter); 
app.use('/api/wishlist', wishlistRouter); 

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
  res.render('error');
});

module.exports = app;
