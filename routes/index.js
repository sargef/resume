const express = require('express');
const router = express.Router();
const data = require('../data.json');

// Landing page index route
router.get('/', (req, res, next) => {
    res.render('index', data);
});

// About page route
router.get('/about', (req, res, next) => {
    res.render('about');
 });

module.exports = router;
