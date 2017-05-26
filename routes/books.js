var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
	Book.findAll().then(books => {
		res.render('books/index', {books: books});
	}).catch((error) => {
		res.send(500, error);
	});
});

module.exports = router;
