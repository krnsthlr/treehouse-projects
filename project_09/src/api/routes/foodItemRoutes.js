'use strict';
var express = require('express');

var routes = function(db) {
  var foodItemRouter = express.Router();
  foodItemRouter.route('/')
    .get(function(req, res) {
      db.find({}).sort({ name: 1 }).exec(function(err, foodItems) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(foodItems);
        }
      });
    })
  return foodItemRouter;
};

module.exports = routes;
