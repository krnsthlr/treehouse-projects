//get a random integer between 0 and (up to but not including) length of quotes array
function getRandomInt() {
	return Math.floor(Math.random() * quotes.length);
}

//randomly select and return an object from quotes.js
function getRandomQuote() {
	var pos = getRandomInt();
	return quotes[pos];
}

function printToPage(text) {
	var outputDiv = document.getElementById("quote-box");
	outputDiv.innerHTML = text;
}

//get a random quote and construct an output string
function printQuote() {
	var html = "";
	var quote = getRandomQuote();

	html += "<p class='quote'>" + quote.quote + "</p>";
	html += "<p class='source'>" + quote.source;

	if("citation" in quote) {
		html += "<span class='citation'>" + quote.citation + "</span>";
	}
	if("year" in quote) {
		html += "<span class='year'>" + quote.year + "</span>";
	}

	html += "</p>";

	printToPage(html);
}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

