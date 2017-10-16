var osmosis = require('osmosis');
var fs = require('fs');
var json2csv = require('json2csv');
const url = 'http://www.shirts4mike.com/';

function checkDirectory(directory) {
	try{
		fs.statSync(directory);
	} catch(e) {
		fs.mkdirSync(directory);
	}
}

function createCSV(data){
	var fields = ['title', 'price', 'img_url', 'product_url','time'];
	var fieldNames = ['Title', 'Price', 'ImageUrl', 'URL', 'Time'];
	var csv = json2csv({data: data, fields: fields, fieldNames: fieldNames});
	return csv;
}

function logError(msg) {
	var logMessage;
	var time = new Date().toISOString();
	if(msg.indexOf('ENOTFOUND') > -1) {
		logMessage = '[' + time + ']' + ` There has been an error: Cannot connect to ${url}\n`;
	} else {
		logMessage = '[' + time + ']' + msg;
	}
	fs.appendFile('./scraper-error.log', logMessage, function(err) {
		if(err) console.log('Error while writing to log file');
			console.log('Writing to log file');
		})
}
 
function scrape(url) {

	checkDirectory('./data');
	var result = [];

	osmosis
	.get(url + 'shirts.php')
	.find('.products li')
	.set({
		'product_url': 'a@href'
	})
	.follow('@href')
	.set({
		'title': 'title',
		'price': '.shirt-details span',
		'img_url': '.shirt-picture img@src'
	})
	.data(function(data) {
		result.push({
			'title': data.title,
			'img_url': url + data.img_url,
			'product_url': url + data.product_url,
			'price': parseInt(data.price.substring(1)),
			'time': new Date().toISOString()
		});
	})
	.done(function() {
		if(result.length == 0) return;
		var csv = createCSV(result);
		var date = new Date().toISOString().slice(0,10);
		fs.writeFile(`./data/${date}.csv`, csv, function(err) {
			if(err) console.log('Error while writing csv file');
			console.log('Csv file saved');
		});
	})
	.error(function(msg) {
		logError(msg);
	});

}

scrape(url);