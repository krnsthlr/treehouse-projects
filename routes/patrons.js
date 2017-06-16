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

/* GET new patron form */
router.get('/new', function(req, res, next){
	res.render('patrons/new', {patron: {}});
});

/* POST new patron */
router.post('/new', function(req, res, next){
	Patron.create(req.body).then(patron => {
		res.redirect('/patrons');
	}).catch(error => {
		if(error.name === 'SequelizeValidationError'){
			res.render('patrons/new', {patron: Patron.build(req.body), errors: error.errors});
		} else {
			throw error
		}
	}).catch(error => {
		res.send(500);
	})
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

/* PUT edit/ update individual patron */
router.put('/:id', function(req, res, next){
	Patron.findById(req.params.id, {
		include: [ 
			{
				model: Loan,
				include: [{model: Patron}]
			}
		]
	}).then(patron => {
		if(patron) {
			return patron.update(req.body);
		} else {
			res.send(404);
		}
	}).then(patron => {
			res.redirect('/patrons');
	}).catch(error => {
		res.send(error.message);
	});
});

module.exports = router;