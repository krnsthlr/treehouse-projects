var express = require('express');
var router = express.Router();

var Patron = require('../models').Patron;

/* GET patrons listing */
router.get('/', function(req, res, next){
	Patron.findAll().then(patrons => {
		res.render('patrons/index', {patrons: patrons});
	}).catch(error => {
		res.send(500);
	});
});


module.exports = router;