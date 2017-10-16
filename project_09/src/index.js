'use strict';
//load modules
var express = require('express'),
  bodyParser = require('body-parser'),
  Datastore = require('nedb'),
  path = require('path');

//setup database
var db = {};
db.categories = new Datastore({
  filename: './src/api/data/categories.db',
  autoload: true
});
db.recipes = new Datastore({
  filename: './src/api/data/recipes.db',
  autoload: true
});
db.foodItems = new Datastore({
  filename: './src/api/data/foodItems.db',
  autoload: true
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 5000;

app.use('/', express.static('public'));

// vendor scripts
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'angular', 'angular.js'));
});
app.get('/vendor/angular-route.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'angular-route', 'angular-route.js'));
});

// recipes
var recipeRouter = require('./api/routes/recipeRoutes.js')(db.recipes, db.foodItems);
app.use('/api/recipes', recipeRouter);

// categories
var categoryRouter = require('./api/routes/categoryRoutes.js')(db.categories);
app.use('/api/categories', categoryRouter);

// food items
var foodItemRouter = require('./api/routes/foodItemRoutes.js')(db.foodItems);
app.use('/api/fooditems', foodItemRouter);

app.listen(port);
console.log('Magic happens on port ' + port);
