var express = require('express');
var router = express.Router();

var Loan = require('../models').Loan;
var Patron = require('../models').Patron;
var Book = require('../models'). Book;

var loanSchema = require('../validate.js').loanSchema;


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
			res.render('loans/index', { loans, title: 'Loans' });		
		}).catch(next);
	}
	/* get loans with status overdue */ 
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
			res.render('loans/index', { loans, title: 'Overdue Loans'} );
		}).catch(next);
	}

	/* get checked out loans */ 
	if(req.query.filter='checked') {
		Loan.findAll({
			include: [{all: true}],
			where: {
				returned_on: null
			}
		}).then(loans => {
			res.render('loans/index', { loans, title: 'Checked Out Books'})
		}).catch(next);
	}

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

			res.render('loans/new', { books, patrons, loaned_on, return_by});
		}).catch(next);
});

/* POST new loan form */
router.post('/new', function(req, res, next) {

	req.checkBody(loanSchema);

	req.getValidationResult().then(result => {

		var errors = result.useFirstErrorOnly().mapped();
		var loan = Loan.build(req.body);

		if(Object.keys(errors).length) {
			Promise.all([getBooks(), getPatrons()])
				.then(([books, patrons]) => {
					res.render('loans/new', {
						books, patrons, loan,
						loaned_on: req.body.loaned_on,
						return_by: req.body.return_by,
						errors
				})
			}).catch(next);
		}

		else {
			loan.save().then(() => {
				res.redirect('/loans');
			}).catch(next);
		}
	});
});

/* GET return loan form */
router.get('/:id', function(req, res, next){

	var returned_on = new Date();
	returned_on = returned_on.toISOString().substr(0,10);

	Loan.findById(req.params.id, {
		include: [{all: true}]
	}).then(loan => {
		if(!loan) {
			next();
		}
		res.render('loans/return', { loan, returned_on });
	}).catch(next);
});

/* PUT return loan form */
router.put('/:id', function(req, res, next) {

	req.checkBody('returned_on', 'Invalid date.').notEmpty().isISO8601();
	var errors = req.validationErrors();

	if(errors) {

		Loan.findById(req.params.id, {
			include: [{all: true}]
		}).then(loan => {
			res.render('loans/return', {
				loan, returned_on: req.body.returned_on, errors
			})
		}).catch(next);
	}

	else {
		Loan.findById(req.params.id).then(loan => {
			loan.update(req.body);
			res.redirect('/loans');
		}).catch(next);
	}
});

module.exports = router;










