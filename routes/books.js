var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;

var bookSchema = require('../validate.js').bookSchema;

/* GET books listing. */
router.get('/', function(req, res, next) {

	/* get all books */
	if(!req.query.filter) {
		Book.findAll().then(books => {
			res.render('books/index', { books, title: 'Books' });
		}).catch(next);
	}
	/* get books with loan status overdue */ 
	if(req.query.filter === 'overdue') {
		var date = new Date();
		Book.findAll({
			include: [
				{model: Loan,
					where: {
						returned_on: null,
						return_by: {
							$lt: date
						}
					}}
			]
		}).then(books => {
			res.render('books/index', { books });
		}).catch(next);
	}

	/* get checked out books */ 
	if(req.query.filter === 'checked_out') {
		Book.findAll({
			include: [
				{
					model: Loan,
					required: true, 
					where: {
						returned_on: null
					}
				}
			]
		}
		).then(books => {
			res.render('books/index', { books });
		}).catch(next);
	}

});

/* GET new book form */
router.get('/new', function(req, res, next) {
	res.render('books/new', {book: {}});
});

/* POST new book form */
router.post('/new', function(req, res, next){

	req.checkBody(bookSchema);
	var book = Book.build(req.body);

	req.getValidationResult().then(result => {

		var errors = result.useFirstErrorOnly().mapped();

		if(errors) {
			res.render('books/new', { book, errors });
		} 

		else {
			book.save().then(book => {
				res.redirect('/books');
			}).catch(next);
		}
	});
	
});

/* GET individual book */
router.get('/:id', function(req, res, next){
	Book.findById(req.params.id, {
		include: [ 
			{
				model: Loan,
				required: false,
				include: [{model: Patron}]
			}
		]
	}).then(book => {
		if(!book) {
			next();
		}
		res.render('books/detail', { book });	
	}).catch(next);
});

/* PUT edit/update individual book */
router.put('/:id', function(req, res, next){
	
	req.checkBody(bookSchema);

	req.getValidationResult().then(result => {

		var errors = result.useFirstErrorOnly().mapped();

		if(Object.keys(errors).length) {

			Book.findById(req.params.id, {
				include: [ 
					{
						model: Loan,
						required: false,
						include: [{model: Patron}]
					}
				]
			}).then(book => {

				book.title = req.body.title;
				book.author = req.body.author;
				book.genre = req.body.genre;
				book.first_published = req.body.first_published;

				res.render('books/detail', { book, errors });
			}).catch(next);
			
		}

		else {
			Book.findById(req.params.id, {
				include: [ 
					{
						model: Loan,
						required: false,
						include: [{model: Patron}]
					}
				]
			}).then(book => {
				book.update(req.body);
				res.redirect('/books');
			}).catch(next);		
		}
	});
});

module.exports = router;
