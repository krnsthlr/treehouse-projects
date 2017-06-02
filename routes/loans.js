var express = require('express');
var router = express.Router();

var Loan = require('../models').Loan;
var Patron = require('../models').Patron;
var Book = require('../models'). Book;

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
			res.render('loans/index', {loans: loans});		
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
		}).then(overdueLoans => {
			res.render('loans/overdue', {overdueLoans: overdueLoans});
		}).catch(error => {
			res.send(500);
		});
	}
	/* get checked out loans */ 


});

module.exports = router;