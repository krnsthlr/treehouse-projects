'use strict';
var Datastore = require('nedb');

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

// clear db
db.categories.remove({}, { multi: true }, function(err, numRemoved) {
  console.log("Removed " + numRemoved + " categories");
});
db.categories.persistence.compactDatafile();

db.recipes.remove({}, { multi: true }, function(err, numRemoved) {
  console.log("Removed " + numRemoved + " recipes");
});
db.recipes.persistence.compactDatafile();

db.foodItems.remove({}, { multi: true }, function(err, numRemoved) {
  console.log("Removed " + numRemoved + " foodItems");
});
db.foodItems.persistence.compactDatafile();

// add categories
var categoryData = require('./categories.js');

db.categories.insert(categoryData, function(err, docs) {
  console.log(docs);
})

// add ingredients
var foodItemsData = require('./foodItems.js');
db.foodItems.insert(foodItemsData, function(err, docs) {
  console.log(docs);
})

// add recipes
var recipeData = require('./recipes.js');

db.recipes.insert(recipeData, function(err, docs) {
  console.log(docs);
})
