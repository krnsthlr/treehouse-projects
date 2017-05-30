var express = require('express');
var router = express.Router();
var Book = require('../models').Book;
var Loan = require('../models').Loan;

/* GET books listing. */
router.get('/', function(req, res, next) {

	/* get all books */
	if(!req.query.filter) {
		Book.findAll().then(books => {
			res.render('books/index', {books: books});
		}).catch(error => {
			res.send(500, error);
		});
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
		}).then(overdueBooks => {
			res.render('books/overdue', {overdueBooks: overdueBooks});
		}).catch(error => {
			res.send(500, error);
		});
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
		).then(checkedBooks => {
			res.render('books/checked', {checkedBooks: checkedBooks});
		}).catch(error => {
			res.send(500, error);
		});
	}

});

module.exports = router;
