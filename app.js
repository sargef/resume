// Required packages for project
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const pug = require('pug');
const path = require('path');
const app = express();

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

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});


