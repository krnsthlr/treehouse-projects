'use strict';
var fs = require('fs');

// delete dbs
var dbs = [
  'foodItems.db',
  'recipes.db',
  'categories.db'
];
dbs.forEach( function(file, index, arr) {
  fs.createReadStream('./bak/' + file)
    .pipe(fs.createWriteStream('./' + file));
});
