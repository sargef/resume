// Required packages for project
const express = require('express');
const httpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
const data = require('./data.json');
const pug = require('pug');
const path = require('path');
const app = express();

var port = process.env.PORT || 8080;

var indexRouter = require('./routes/index');

// Setting view engine to use pug
app.set('view engine', 'pug');

// Setting static assets to public folder
app.use('/static', express.static('public'));

// Parse body data
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Imports page route objects
app.use('/', indexRouter);

// catch 404 Error
app.use((req, res, next) => {
  const err = new Error('There is no such page, sorry!');
  err.status = 404;
  next(err);
});

// Development Error Handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log('There is no such page, sorry!', err.status);
  });
}

//Production Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  console.log('There is no such page, sorry!', err.status);
});

module.exports = app;

 // Setting port to listen on port 3000
 app.listen(port, function() {
    console.log('Your app is listening on port:' + port);
});
