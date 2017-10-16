'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
     associate: function(models) {
       Book.hasMany(models.Loan, {foreignKey: 'book_id'});
     }
    }
  });
  return Book;
};