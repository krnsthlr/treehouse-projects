'use strict';

const express = require('express');
const parse = require('./parse.js');
const Twit = require('twit');
const config = require('../config.js');

const app = express();
const T = new Twit(config);

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

const getUser = () => T.get('account/verify_credentials', {include_entities: 'false', skip_status: 'true'})
					  .then((result) => parse.user(result.data));

const getTweets = () => T.get('statuses/user_timeline', {count: '5', include_rts: 'true', exclude_replies: 'true'})
						.then((result) => parse.tweets(result.data));

const getFriends = () => T.get('friends/list', {count: '5', include_user_entities: 'false'})
						.then((result) => parse.friends(result.data.users));

const getMessages = () => T.get('direct_messages', {count: '5'})
						  .then((result) => parse.messages(result.data));

app.get('/', (req,res) => {
	Promise.all([getUser(), getTweets(), getFriends(), getMessages()])
			.then(([user, tweets, friends, messages]) => res.render('index', {user: user, tweets: tweets, friends: friends, messages: messages}))
			.catch((error) => res.send('Sorry, there was a problem.' + error));
});


app.listen(3000, function() {
	console.log('App listening on port 3000!');
});
