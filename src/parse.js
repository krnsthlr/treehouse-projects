/** parse twitter 'created_at' string and compute time elapsed */
const parseDate = (dateString) => {
	const tweetTime = new Date(Date.parse(dateString));
	const now = new Date();
	now.getTime();
	let difference_ms = now - tweetTime;
	difference_ms /= 60000;
	const min = Math.floor(difference_ms % 60);
	difference_ms /= 60;
	const hrs = Math.floor(difference_ms % 24);
	difference_ms /= 24;
	const days = Math.floor(difference_ms % 365);
	const years = Math.floor(difference_ms/365);
	if(years > 0) return years + ' y ' + days + ' d';
	if(days > 0) return days + ' d';
	if(hrs > 0) return hrs + ' h';
	else return min + ' min';
}

/** twit response data extractors */
const extractTweets = (tweets) => {
	return tweets.map((elem) => {
		return {
				avatar: elem.user.profile_image_url,
				name: elem.user.name,
				screen_name: elem.user.screen_name,
				text: elem.text,
				rts: elem.retweet_count,
				likes: elem.favorite_count,
				time: parseDate(elem.created_at)
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

const extractUser = (user) => {
		return {
			friends: user.friends_count,
			screen_name: user.screen_name,
			avatar: user.profile_image_url
		}
}

const extractMessages = (messages) => {
	return messages.map((elem) => {
		return {
			sender_name: elem.sender.name,
			sender_avatar: elem.sender.profile_image_url,
			text: elem.text,
			time: parseDate(elem.created_at)
		}
	})
}


module.exports.tweets = extractTweets;
module.exports.friends = extractFriends;
module.exports.user = extractUser;
module.exports.messages = extractMessages;