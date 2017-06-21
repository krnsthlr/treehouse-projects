var bookSchema = {
	'title': {
			notEmpty: {
				errorMessage: 'Title is required.'
			}
		},
	'author': {
		notEmpty: {
			errorMessage: 'Author is required.'
		}
	},
	'genre': {
		notEmpty: {
			errorMessage: 'Genre is required.'
		}
	},
	'first_published': {
		optional: {
			options: [{checkFalsy: true}]
		},
		isInt: {
			errorMessage: 'Invalid Date.'
		},
		isLength: {
			options: [{min: 4, max: 4}],
			errorMessage: 'Invalid Date.'
		}
	}
}

var loanSchema = {
	'book_id': {
		isNumeric: {
			errorMessage: 'Book title is required.'
		}
	},
	'patron_id': {
		isNumeric: {
			errorMessage: 'Patron name is required.'
		}
	},
	'loaned_on': {
		notEmpty: {
			errorMessage: 'Date is required (YYYY-MM-DD).'
		},
		isISO8601: {
			errorMessage: 'Invalid date.'
		}
	},
	'return_by': {
		notEmpty: {
			errorMessage: 'Date is required (YYYY-MM-DD).'
		},
		isAfter: {
			errorMessage: 'Invalid return date.'
		}
	}
}


module.exports.bookSchema = bookSchema;
module.exports.loanSchema = loanSchema;