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

// Project pages route & if statement to catch 404 error
router.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const projectTemplate = { 
        project: data.projects[id]
    }
    if (projectTemplate.project) {
        res.render('project', projectTemplate);
    } else {
        const error = new Error('The page you were looking for does not exist');
        error.status = 404;
        console.log(error.message, error.status)
        next(error);
    }   
})

module.exports = router;