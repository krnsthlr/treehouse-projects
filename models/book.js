'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is a required field."
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author is a required field."
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Genre is a required field."
        }
      }
    },
    first_published: DataTypes.INTEGER
  },{
    classMethods: {
      associate: function(models) {
        Book.hasMany(models.Loan, {foreignKey: 'book_id'});
      }
    }
  });
  return Book;
};