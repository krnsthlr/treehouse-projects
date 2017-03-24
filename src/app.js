'use strict';

const express = require('express');
const Twit = require('twit');
const config = require('../config.js');

const app = express();
const T = new Twit(config);

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

const extractTweets = (tweets) => {
	return tweets.map((elem) => {
		return {
				avatar: elem.user.profile_image_url,
				name: elem.user.name,
				screen_name: elem.user.screen_name,
				text: elem.text,
				rts: elem.retweet_count,
				likes: elem.favorite_count
			}
	});
};

const extractFriends = (friends) => {
	return friends.map((elem) => {
		return {
				avatar: elem.profile_image_url,
				name: elem.name,
				screen_name: elem.screen_name
			}
	});
};

const getTweets = () => T.get('statuses/user_timeline', {count: '5', include_rts: 'true', exclude_replies: 'true'})
						.then((result) => extractTweets(result.data));

const getFriends = () => T.get('friends/list', {count: '5', include_user_entities: 'false'})
						.then((result) => extractFriends(result.data.users));

app.get('/', (req,res) => {
	Promise.all([getTweets(), getFriends()])
			.then(([tweets, friends]) => res.render('index', {tweets: tweets, friends: friends}));
});


app.listen(3000, function() {
	console.log('App listening on port 3000!');
});
