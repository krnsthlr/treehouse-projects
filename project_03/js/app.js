var jobTitleInput = document.getElementById("other-title");
var designSelect = document.getElementById("design");
var colorSelect = document.getElementById("color");
var eventSelect = document.querySelectorAll(".activities input");
var priceInfo = document.createElement("span");
var total = 0;
var paymentInfo = document.querySelectorAll(".payment > div");

/* ================================= 
   Basic Info Section */

var showJobTitleInput = function() {
	var optionVal = document.getElementById("title").value;
	if(optionVal === "other") {
		jobTitleInput.style.display = "block";
	} else {
		jobTitleInput.style.display = "none";
	}
}

/* ================================= 
  T-Shirt Info Section */

var changeTShirtColors = function() {
	
	var colors = themesAndColors[designSelect.value];
	while(colorSelect.options.length) {
		colorSelect.options.remove(0);
	}
	if(colors) {
		var i;
		for(i = 0; i < colors.length; ++i) {
			var color = document.createElement("option");
			color.value = colors[i][0];
			color.text = colors[i][1];
			colorSelect.add(color);
		}
	}
}

/* ================================= 
  Activities Section */

//Match selected activity with activity description in data.js
function getActivityData(selActivity) {
	var pos;
	var name = selActivity.name;
	for(var i = 0; i < activities.length; ++i) {
		if(activities[i].name == name) {
			pos = i;
			break;
		}
	}
	return activities[pos];
}
//Filter activities when they are colliding
function filterActivities(currentActivity) {
	var i;
	for(i = 0; i < activities.length; ++i) {
		//Check if events are collding
		if(activities[i].name !== currentActivity.name && 
		   activities[i].day === currentActivity.day &&
		   activities[i].time_start === currentActivity.time_start){
		   //Toggle disabled property for both checkbox and label
		   eventSelect[i].disabled === false ? eventSelect[i].disabled = true : eventSelect[i].disabled = false;
		   eventSelect[i].parentNode.classList.toggle("disabled");
		}
	}
}
//Calculate and display running total for selected activities
function displayPrice(currentElement, currentActivity) {
	currentElement.checked === true ? total += currentActivity.price : total -= currentActivity.price;
	priceInfo.innerText = "Total: $" + total;
	if(total > 0) priceInfo.style.display = "";
	else priceInfo.style.display = "none";
}
//When change event occurs on checkbox, filter activities and display price info
function updateActivities() {
	var currentElement = this;
	var currentActivity = getActivityData(this);
	filterActivities(currentActivity);
	displayPrice(currentElement, currentActivity);
}

/* ================================= 
  Payment Info Section */

var changePaymentInfo = function() {
	var selPayment = this.value;
	var i;
	for(i = 0; i < paymentInfo.length; ++i) {
		if(paymentInfo[i].classList.contains(selPayment)) {
			paymentInfo[i].style.display = "";
		} else {
			paymentInfo[i].style.display = "none";
		}
	}
}

/* ================================= 
  Register Event Handlers */

//Job Role Select
document.getElementById("title").addEventListener("change", showJobTitleInput);
//Design Select - T-Shirt Color Info
designSelect.addEventListener("change", changeTShirtColors);
//Checkboxes in Activities Section
for(var i = 0; i < eventSelect.length; ++i) {
	eventSelect[i].onchange = updateActivities;
}
//Payment Select - Payment Info
document.getElementById("payment").addEventListener("change", changePaymentInfo);


/* ================================= 
  When Page Loads */

//Give focus to the first text field
document.querySelector("input[type=text]:first-of-type").focus();
//Hide "Other Job Role"- input field
jobTitleInput.style.display = "none";
//Trigger change event to show appropriate colors in T-Shirt Info select
changeTShirtColors();
//Append Price Info to Activities Section
document.querySelector(".activities").appendChild(priceInfo);
//No payment info is displayed, until payment method is chosen
changePaymentInfo();

