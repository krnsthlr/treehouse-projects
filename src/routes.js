'use strict';

var express = require('express');
var router = express.Router();
var User = require('./models.js').User;
var Course = require('./models.js').Course;
var auth = require('basic-auth');

// Check for user authentication
function requiresLogin(req, res, next){
	var credentials = auth(req);
	if (credentials === undefined) {
		var err = new Error('Unidentified user');
		err.status = 401;
		return next(err);
	}
	User.authenticate(credentials.name, credentials.pass, function(err, user){
		if(err) return next(err);
		req.user = user;
		return next();
	})
}

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

//GET /users
router.get('/users', requiresLogin, function(req, res, next){
	res.json(req.user);
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

// POST /courses
router.post('/courses', requiresLogin, function(req, res, next){
	var course = new Course(req.body);
	course.save(function(err, course){
		if(err) return next(err);
		res.status = 201;
		res.setHeader('Location', '/' + course._id);
		res.send();
	})
});

// PUT /courses/:id
router.put('/courses/:courseID', requiresLogin, function(req, res, next){
	Course.update({_id: req.course._id}, {$set: req.body}, function(err, course){
		if(err) return next(err);
		res.status = 204;
		res.send();
	});
});


module.exports = router;