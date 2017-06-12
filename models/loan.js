'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Book ID/ title is a required field."
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Patron ID/ name is a required field."
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Loaned on is a required field."
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Return by is a required field."
        }
      }
    },
    returned_on: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        Loan.belongsTo(models.Book, {foreignKey: 'book_id'});
        Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'});
      }
    }
  });
  return Loan;
};