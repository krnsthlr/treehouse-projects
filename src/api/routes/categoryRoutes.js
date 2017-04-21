'use strict';
var express = require('express');

var routes = function(db) {
  var categoryRouter = express.Router();
  categoryRouter.route('/')
    .get(function(req, res) {
      db.find({}).sort({ name: 1 }).exec(function(err, categories) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(categories);
        }
      });
    });
  return categoryRouter;
};

module.exports = routes;
