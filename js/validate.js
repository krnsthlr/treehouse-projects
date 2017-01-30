var eventSelect = document.querySelectorAll(".activities input");
var nameMessage = " Please enter your name";
var mailMessage = " Please provide a valid email address";
var activityMessage = " Please select an Activity";


/* ================================= 
   Basic Info Section */

function isNameEmpty() {
	return document.getElementById("name").value === "";
}

function hasEmail() {
	var email = document.getElementById("mail").value;
	return /\S+@\S+\.\S+/.test(email);
}


/* ================================= 
  Activities Section */

function activitySelected() {
	var i;
	checked = 0;
	for(i = 0; i < eventSelect.length; ++i) {
		if(eventSelect[i].checked === true) ++checked;
	}
	return checked > 0;
}


/* ================================= 
  Payment Info Section */

function ccNumberCorrect() {
	var cardNumber = document.getElementById("cc-num").value;
	var cardLength = cardNumber.length >= 13 && cardNumber.length <= 16;
	return cardLength && !isNaN(cardNumber);
}

function zipCorrect() {
	var zipCode = document.getElementById("zip").value;
	var zipLength = zipCode.length === 5;
	return zipLength && !isNaN(zipCode);
}

function cvvCorrect() {
	var cvv = document.getElementById("cvv").value;
	cvvLength = cvv.length === 3;
	return cvvLength && !isNaN(cvv);
}

function creditInfoCorrect() {
	var paymentSelect = document.getElementById("payment");
	if(paymentSelect.value !== "credit-card" && paymentSelect.value !== "select_method") return true;
	return ccNumberCorrect() && zipCorrect() && cvvCorrect();
}


/* ================================= 
  Validation and Error Handling */

function createErrorMessage(text) {
	var message = document.createElement("span");
	message.className = "error";
	message.innerText = text;
	return message;
}

function showErrorMessages() {
	if(isNameEmpty()) { 
		var message = createErrorMessage(nameMessage);
		document.querySelector("label[for='name']").appendChild(message);
	};
	if(!hasEmail()){
		var message = createErrorMessage(mailMessage);
		document.querySelector("label[for='mail']").appendChild(message);
	}
	if(!activitySelected()){
		var position = document.querySelector(".activities legend");
		var message = createErrorMessage(activityMessage);
		position.appendChild(message);	
	}
	if(document.getElementById("payment").value === "select_method") 
		document.querySelector("label[for='payment']").className += "message";
	if(!ccNumberCorrect()) document.querySelector("label[for='cc-num']").className += "message";
	if(!zipCorrect()) document.querySelector("label[for='zip']").className += "message";
	if(!cvvCorrect()) document.querySelector("label[for='cvv']").className += "message";
}

var canSubmit = function(event) {
	//Prevent button from automatically submitting
	event.preventDefault();
	//Get rid of previous error messages
	while(document.querySelectorAll(".error").length) {
		document.querySelectorAll(".error")[0].remove();
	}
	while(document.querySelectorAll(".message").length) {
		document.querySelectorAll(".message")[0].className = "";
	}
	//If form is valid, trigger submit event on form
	if(!isNameEmpty() && hasEmail() && activitySelected() && creditInfoCorrect()) {
		document.querySelector("form").submit();
	} else {
		showErrorMessages();
	}
}

/* ================================= 
  Event Handlers */

document.querySelector("button[type='submit']").addEventListener("click", canSubmit);

