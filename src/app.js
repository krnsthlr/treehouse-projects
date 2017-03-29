'use strict';

const express = require('express');
const parse = require('./parse.js');
const Twit = require('twit');
const config = require('../config.js');

/** instantiate twit */
const T = new Twit(config);

/** instantiate express app */
const app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

/** primary response handler to check for errors */
const responseHandler = ({data, resp}) => {
	// twit seems to resolve (network-)errors w/o any further information:
	// https://github.com/ttezel/twit/issues/256
	// To catch, function checks if resp(onse) is null
	if(resp === null) {
		return Promise.reject('Unknown error.')
	}
	//Catch any error response from the twitter api
	if(Math.floor(resp.statusCode / 100) !== 2) {
		const msg = data.errors.map((error) => error.message).join(' / ');
		return Promise.reject(`${resp.statusCode}: ${msg}`);
	}
	return Promise.resolve(data);
}

/** generate promises */
const getUser = () => T.get('account/verify_credentials', {include_entities: 'false', skip_status: 'true'})
	.then((result) => responseHandler(result))
	.then((data) => parse.user(data));

const getTweets = () => T.get('statuses/user_timeline', {count: '5', include_rts: 'true', exclude_replies: 'true'})
	.then((result) => responseHandler(result))
	.then((data) => parse.tweets(data));

const getFriends = () => T.get('friends/list', {count: '5', include_user_entities: 'false'})
	.then((result) => responseHandler(result))
	.then((data) => parse.friends(data.users));

const getMessages = () => T.get('direct_messages', {count: '5'})
	.then((result) => responseHandler(result))
	.then((data) => parse.messages(data));

/** make the actual api requests, resolve and render */
app.get('/', (req,res) => {
	Promise.all([getUser(), getTweets(), getFriends(), getMessages()])
			.then(([user, tweets, friends, messages]) => res.render('index', {user: user, tweets: tweets, friends: friends, messages: messages}))
			.catch((e) => res.send(e));
});


app.listen(3000, function() {
	console.log('App listening on port 3000!');
});
