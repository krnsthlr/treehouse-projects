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

module.exports.bookSchema = bookSchema;