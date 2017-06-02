var express = require('express');
var router = express.Router();

var Loan = require('../models').Loan;
var Patron = require('../models').Patron;
var Book = require('../models'). Book;

/* GET loans listing */
router.get('/', function(req, res, next) {
	
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

});

module.exports = router;