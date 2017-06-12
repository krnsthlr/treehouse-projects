var express = require('express');
var router = express.Router();

var Loan = require('../models').Loan;
var Patron = require('../models').Patron;
var Book = require('../models'). Book;


/* generate promises for GET new loan form */
var getBooks = () => Book.findAll().then(books => {
		return books.map((elem) => {
			return {
				book_id: elem.id,
				title: elem.title
			}
		});
	});

var getPatrons = () => Patron.findAll().then(patrons => {
	return patrons.map((elem) => {
		return {
			patron_id: elem.id,
			first_name: elem.first_name,
			last_name: elem.last_name
		}
	});
});


/* GET loans listing */
router.get('/', function(req, res, next) {

	/* get all loans */
	if(!req.query.filter) {
		Loan.findAll({
			include: [
				{
					all: true
				}
			]
		}).then(loans => {
			res.render('loans/index', {loans: loans, title: 'Loans'});		
		}).catch(error => {
			res.send(500);
		});
	}
	/* get laons with status overdue */ 
	if(req.query.filter == 'overdue') {
		var date = new Date();
		Loan.findAll({
			include: [{all: true}],
			where: {
				returned_on: null,
				return_by: {
					$lt: date
				}
			}
		}).then(loans => {
			res.render('loans/index', {loans: loans, title: 'Overdue Loans'});
		}).catch(error => {
			res.send(500);
		});
	}
	/* get checked out loans */ 
	if(req.query.filter='checked') {
		Loan.findAll({
			include: [{all: true}],
			where: {
				returned_on: null
			}
		}).then(loans => {
			res.render('loans/index', {loans: loans, title: 'Checked Out Books'})
		}).catch(error => {
			res.send(500);
		});
	}

});

/* POST new loan form */
router.post('/new', function(req, res, next) {
	Loan.create(req.body).then(loan => {
		res.redirect('/loans');
	}).catch(error => {
		if(error.name === "SequelizeValidationError") {
			Promise.all([getBooks(), getPatrons()])
				.then(([books, patrons]) => {
					res.render('loans/new',
					 {
					 	books: books, 
					 	patrons: patrons, 
					 	loaned_on: req.body.loaned_on, 
					 	return_by: req.body.return_by,
					 	errors: error.errors,
					 	loan: Loan.build(req.body)
					 })
				});		
		} else {
			throw error;
		}
	}).catch(error => {
		res.send(500);
	});
});

/* GET new loan form */
router.get('/new', function(req, res, next) {
	Promise.all([getBooks(), getPatrons()])
		.then(([books, patrons]) => {

			var loaned_on = new Date();
			loaned_on = loaned_on.toISOString().substr(0,10);
			var return_by = new Date(loaned_on);
			return_by.setDate(return_by.getDate() + 7);
			return_by = return_by.toISOString().substr(0,10);

			res.render('loans/new', 
				{
					books: books, 
					patrons: patrons, 
					loaned_on: loaned_on, 
					return_by: return_by
				});
		}).catch(error => {
			res.send(500);
		});
});


module.exports = router;