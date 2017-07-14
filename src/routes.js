'use strict';

var express = require('express');
var router = express.Router();
var User = require('./models.js').User;
var Course = require('./models.js').Course;

//Add callback trigger to 'courseID' parameter
router.param('courseID', function(req, res, next, id){
	Course.findById(id)
		.populate('user')
		.populate('reviews')
		.exec(function(err, doc){
			if(err) return next(err);
				if(!doc){
				var err = new Error('File Not Found');
				err.status = 404;
				return next(err);
			}
			req.course = doc;
			return next();
	});
	
});

// POST /users
router.post('/users', function(req, res, next){
	var user = new User(req.body);
	user.save(function(err, user){
		if(err) return next(err);
		res.status = 201;
		res.setHeader('Location', '/');
		res.send();
	})
});

// GET /courses
router.get('/courses', function(req, res, next){
	Course.find({}, 'title')
		.exec(function(err, courses) {
			if(err) return next(err);
			return res.json(courses);
		});
});

// GET /courses/:id
router.get('/courses/:courseID', function(req, res, next){
	res.json(req.course);
});

module.exports = router;