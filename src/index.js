'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var seeder = require('mongoose-seeder');
var data = require('./data/data.json');

var User = require('./models.js').User;
var Course = require('./models.js').Course;
var Review = require('./models.js').Review;

var app = express();

/** mpromise (mongoose's default promise library) is deprecated, 
plug in your own promise library instead: http://mongoosejs.com/docs/promises.html */
mongoose.Promise = global.Promise;

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// set up database connection
var db = mongoose.connect('mongodb://localhost:27017/course-rating', {
  useMongoClient: true
});

db
  .then(function(db){
    console.log('mongodb has been connected');

    seeder.seed(data).then(function(dbData){
      console.log('data has been stored in db');
    }).catch(function(err){
      console.error('failed to store data in db');
    });
    
  })
  .catch(function(err){
    console.error('connection error: ', err);
  });

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
