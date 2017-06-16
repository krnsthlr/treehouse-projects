var express = require('express');
var router = express.Router();

var Patron = require('../models').Patron;
var Loan = require('../models').Loan;
var Book = require('../models').Book;

/* GET patrons listing */
router.get('/', function(req, res, next){
	Patron.findAll().then(patrons => {
		res.render('patrons/index', {patrons: patrons});
	}).catch(error => {
		res.send(500);
	});
});

/* GET individual patron */
router.get('/:id', function(req, res, next){
	Patron.findById(req.params.id, {
		include: {
			model: Loan,
			include: {
				model: Book
			}
		}
	}).then(patron => {
		if(patron) {
			res.render('patrons/detail', {patron: patron});	
		} else {
			res.send(404);
		}
	}).catch(error => {
		res.send(500);
	});
});

module.exports = router;