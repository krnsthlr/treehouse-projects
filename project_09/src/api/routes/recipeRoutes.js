'use strict';
var express = require('express');

// define recipe model
var recipeFields = {
  name: {
    required: false,
    dataType: 'string',
    displayName: 'Name'
  },
  description: {
    required: false,
    dataType: 'string',
    displayName: 'Description'
  },
  category: {
    required: false,
    dataType: 'string',
    displayName: 'Category'
  },
  prepTime: {
    required: false,
    dataType: 'string',
    displayName: 'Prep Time'
  },
  cookTime: {
    required: false,
    dataType: 'string',
    displayName: 'Cook Time'
  },
  ingredients: {
    required: false,
    dataType: 'array',
    displayName: 'Ingredients',
    requireAtLeastOneElement: false,
    elementSchema: {
      foodItem: {
        required: false,
        dataType: 'string',
        displayName: 'Item'
      },
      condition: {
        required: false,
        dataType: 'string',
        displayName: 'Condition'
      },
      amount: {
        required: false,
        dataType: 'string',
        displayName: 'Amount'
      }
    }
  },
  steps: {
    required: false,
    dataType: 'array',
    displayName: 'Steps',
    requireAtLeastOneElement: false,
    elementSchema: {
      description: {
        required: false,
        dataType: 'string',
        displayName: 'Description'
      }
    }
  }
};

// validation routine
// look to see if all fields are there.
// todo: check properties are of correct type
var validateRecipe = function(request) {
  var results = {
    complete: true,
    recipe: {},
    error: {
      message: 'Invalid recipe format',
      errors: {}
    }
  };

  var field = {};
  var value = null;
  var errors = [];

  for (var item in recipeFields) {
    field = recipeFields[item];
    value = request[item];
    errors = validateField(item, field, value);

    if (errors.length > 0) {
      results.complete = false;
      results.error.errors[item] = errors;
    } else {
      results.recipe[item] = request[item];
    }
  }

  return results;
};

function validateField(item, field, value, prefix) {
  var errors = [];
  var dataTypeError = null;
  var arrayElementField = {};
  var arrayElementValue = null;
  var arrayElementPrefix = '';
  var arrayElementErrors = [];

  // if we weren't passwed a prefix parameter value
  // then default prefix to an empty string
  if (prefix === undefined) {
    prefix = '';
  }

  // if this is a required field then ensure that we have a value
  // must check for 0 (since its a valid value for
  // a property but JavaScript treats it as falsey)
  if (field.required && !hasValue(field, value)) {
    errors.push({
      code: 'required_field',
      message: prefix + 'Please provide a ' + field.dataType + ' value for the \'' + item + '\' property',
      userMessage: prefix + 'Please provide a value for \'' + field.displayName + '\''
    });
  }

  // if we don't have errors so far and we have a value...
  if (errors.length === 0 && hasValue(field, value)) {
    dataTypeError = validateFieldDataType(item, field, value, prefix);
    if (dataTypeError) {
      errors.push(dataTypeError);
    }
  }

  // if we don't have errors so far and this is an array field...
  if (errors.length === 0 && field.dataType === 'array') {
    // if this array requires at least one element
    // then ensure that we have at least one element
    if (field.requireAtLeastOneElement && value.length === 0) {
      errors.push({
        code: 'non_empty_array_field',
        message: prefix + 'Please provide a non-empty array for the \'' + item + '\' property',
        userMessage: prefix + 'Please provide at least one item for \'' + field.displayName + '\''
      });
    }

    // validate each array element
    for (var arrayElementIndex = 0; arrayElementIndex < value.length; arrayElementIndex++) {
      // validate each item in the element schema
      for (var arrayElementItem in field.elementSchema) {
        arrayElementField = field.elementSchema[arrayElementItem];
        arrayElementValue = value[arrayElementIndex][arrayElementItem];
        arrayElementPrefix = field.displayName + ' Item #' + (arrayElementIndex + 1) + ': ';
        arrayElementErrors = validateField(
          arrayElementItem, arrayElementField, arrayElementValue, arrayElementPrefix);

        if (arrayElementErrors.length > 0) {
          errors = errors.concat(arrayElementErrors);
        }
      }
    }
  }

  return errors;
}

function hasValue(field, value) {
  return (value !== undefined && value !== null && (field.dataType !== 'string' || value !== ''));
}

function validateFieldDataType(item, field, value, prefix) {
  var error = null;
  var dataTypeIsValid = true;

  switch (field.dataType) {
    case 'string':
      break;
    case 'number':
      dataTypeIsValid = ((typeof value) === field.dataType);
      break;
    case 'array':
      dataTypeIsValid = Array.isArray(value);
      break;
  }

  if (!dataTypeIsValid) {
    error = {
      code: 'incorrect_field_data_type',
      message: prefix + 'Please provide a ' + field.dataType + ' value for the \'' + item + '\' property',
      userMessage: prefix + 'Please provide a ' + field.dataType + ' value for \'' + field.displayName + '\''
    };
  }

  return error;
}

// function to create case-insensitive searches
function returnSearchRegex(value) {
  var regex = new RegExp(value, 'i');
  return { "$regex": regex };
}

// add new foodItems to the foodItems collection
var addIngredients = function(ingredients, ingDB) {
  var foodItems = ingredients.map(function(obj) {
    return (obj.foodItem);
  });
  ingDB.find({}, function(err, objs) {
    var data = [];
    var currentItems = objs.map(function(obj) {
      return (obj.name.toUpperCase());
    });
    foodItems.forEach(function(foodItem, index, arr) {
      if (currentItems.indexOf(foodItem.toUpperCase()) === -1) {
        data.push({ "name": foodItem });
      }
    });
    if (data.length > 0) {
      ingDB.insert(data, function(err, newDoc) {
        if (err) {
          res.status(500).json(err);
        } else {
          console.log("Added new food items: " + data);
        }
      });
    }
  });
};

// create routes
var routes = function(db, ingDB) {
  var recipeRouter = express.Router();

  recipeRouter.route('/')
    .post(function(req, res) {
      var cleaned = validateRecipe(req.body);
      var recipe = cleaned.recipe;
      if (cleaned.complete) {
        addIngredients(recipe.ingredients, ingDB);
        db.insert(recipe, function(err, newDoc) {   // Callback is optional
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(201).json(newDoc);
          }
        });
      } else {
        res.status(400).json(cleaned.error);
      }
    })
    .get(function(req, res) {

      // by default search for all
      var query = {};
      // filter by name param
      if (req.query.name) {
        query.name = returnSearchRegex(req.query.name);
      }
      // filter by category param
      if (req.query.category) {
        // allow for case-insensitive search
        query.category = returnSearchRegex(req.query.category);
      }
      db.find(query).sort({ name: 1 }).exec(function(err, recipes) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(recipes);
        }
      });
    });

  // middleware for single recipe
  // used for get, put, patch, remove
  // retrieves 1 recipe and attachs to req object
  recipeRouter.use('/:recipeId', function(req, res, next) {
    db.findOne({ _id: req.params.recipeId }, function(err, recipe) {
      if (err) {
        res.status(500).send(err);
      } else if (recipe) {
        // attach full recipe object to the request
        req.recipe = recipe;
        next();
      } else {
        res.status(404).send('No recipe found.');
      }
    });
  });

  // find specific recipe by ID
  recipeRouter.route('/:recipeId')
    .get(function(req, res) {
      res.json(req.recipe);
    })
    .put(function(req, res) {
      var cleaned = validateRecipe(req.body);
      var recipe = cleaned.recipe;
      if (cleaned.complete) {
        db.update({ "_id": req.recipe._id }, recipe, { multi: false }, function(err, numReplaced) {
          if (err) {
            res.status(500).send(err);
          } else {
            recipe._id = req.recipe._id;
            res.json(recipe);
          }
        });
      } else {
        res.status(400).send(cleaned.error);
      }
    })
    .patch(function(req, res) {
      if (req.body._id) {
        delete req.body._id;
      }
      // needs validation
      for (var p in req.body) {
        req.recipe[p] = req.body[p];
      }
      db.update({ "_id": req.recipe._id }, req.recipe, { multi: false }, function(err, numReplaced) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.recipe);
        }
      });
    })
    .delete(function(req, res) {
      db.remove(req.recipe, {}, function(err, numRemoved) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Recipe removed');
        }
      });
    });

  return recipeRouter;
};

module.exports = routes;
