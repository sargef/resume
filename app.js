// Required packages for project
const express = require('express');
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

// Print error page
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.locals.error = err;
  err.status = 404;
  res.status(err.status);
  res.render('error');
});

// Development Error handler
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message, 
        error: err
      });
    });
  }
  
//Production Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });


module.exports = app;

 // Setting port to listen on port 8080
 app.listen(port, function() {
    console.log('Your app is listening on port:' + port);
});
