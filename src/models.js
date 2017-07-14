'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
		fullName: {
			type: String,
			trim: true,
			required: [true, 'User name required']
		},
		emailAddress: {
			type: String,
			trim: true,
			unique: true,
			required: [true, 'User email required'],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Invalid user email']
		},
		password: {
			type: String,
			required: [true, 'User password required']
		}
	});

UserSchema.pre('save', function(next){

	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.statics.authenticate = function(email, password, callback){
	User.findOne({emailAddress: email})
		.exec(function(err, user){
			if(err) return callback(err);
			if(!user) {
				var err = new Error('User not found');
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function(err, res){
				if(res === false) {
					var err = new Error('User authentication failed');
					err.status = 403;
					return callback(err);
				}
				return callback(null, user);
			})
		});
}

var User = mongoose.model('User', UserSchema);



var CourseSchema = new Schema({
		user: [{type: Schema.ObjectId, ref: 'User'}],
		title: {
			type: String,
			trim: true,
			required: [true, 'Course title required']
		},
		description: {
			type: String,
			required: [true, 'Course description required']
		},
		estimatedTime: String,
		materialsNeeded: String,
		steps: [{
			stepNumber: Number,
			title: {
				type: String,
				trim: true,
				required: true
			},
			description: {
				type: String,
				required: true
			}
		}],
		reviews: [{type: Schema.ObjectId, ref: 'Review'}]
	});

var Course = mongoose.model('Course', CourseSchema);



var ReviewSchema = new Schema({
		user: Schema.ObjectId,
		postedOn: {
			type: Date,
			default: Date.now()
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true, 
		},
		review: String
	});

var Review = mongoose.model('Review', ReviewSchema);


module.exports.User = User;
module.exports.Course = Course;
module.exports.Review = Review;