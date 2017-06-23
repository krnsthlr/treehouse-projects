var express = require('express');
var router = express.Router();

var Patron = require('../models').Patron;
var Loan = require('../models').Loan;
var Book = require('../models').Book;

var patronSchema = require('../validate.js').patronSchema;

/* GET patrons listing */
router.get('/', function(req, res, next){
	Patron.findAll().then(patrons => {
		res.render('patrons/index', { patrons });
	}).catch(next);
});

/* GET new patron form */
router.get('/new', function(req, res, next){
	res.render('patrons/new', {patron: {}});
});

/* POST new patron */
router.post('/new', function(req, res, next){

	req.checkBody(patronSchema);
	var patron = Patron.build(req.body);

	req.getValidationResult().then(result => {

		var errors = result.useFirstErrorOnly().mapped();

		if(errors) {
			res.render('patrons/new', { patron, errors });
		}

		else {
			patron.save().then(() => {
				res.redirect('/patrons');
			}).catch(next);
		}
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
		if (!patron) {
			next();
		}
		res.render('patrons/detail', {patron: patron});
	}).catch(next);
});

/* PUT edit/ update individual patron */
router.put('/:id', function(req, res, next){

	req.checkBody(patronSchema);

	req.getValidationResult().then(result => {

		var errors = result.useFirstErrorOnly().mapped();

		if(Object.keys(errors).length) {
			Patron.findById(req.params.id, {
				include: [
					{
						model: Loan,
						include: [{model: Book}]
					}
				]
			}).then(patron => {

				patron.first_name = req.body.first_name;
				patron.last_name = req.body.last_name;
				patron.address = req.body.address;
				patron.email = req.body.email;
				patron.library_id = req.body.library_id;
				patron.zip_code = req.body.zip_code;

				res.render('patrons/detail', {patron: patron, errors: errors})
			});
		}

		else {
			Patron.findById(req.params.id).then(patron => {
				return patron.update(req.body);
			}).then(() => {
				res.redirect('/patrons');
			}).catch(next);
		}
	});
});

module.exports = router;