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

module.exports = app;

 // Setting port to listen on port 8080
 app.listen(port, function() {
    console.log('Your app is listening on port:' + port);
});
