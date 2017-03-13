'use strict';

const express = require('express');
const Twit = require('twit');
const config = require('../config.js');

const app = express();

const T = new Twit(config);

/**
T.get('friends/list', {count: '5', include_user_entities: 'false'}, function(err, data, res) {
	console.log(data);
}) **/

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	res.render('index');
})

app.listen(3000, function() {
	console.log('App listening on port 3000!');
})
