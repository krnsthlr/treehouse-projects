
var $students = $(".student-item");
var numberOfPages = Math.ceil($students.length/10);

var $search = $("<div class='student-search'></div>");
var $inputSearch = $("<input placeholder='Search for students ...'></input>");
var $searchButton = $("<button>Search</button>");
var $message = $("<span>Sorry, no matches.</span>");

var $pagination = $("<div class='pagination'></div>");
var $paginationList = $("<ul></ul>");

var min, max;

//Append input and search button
$search.append($inputSearch);
$search.append($searchButton);
$(".page-header").append($search);
$(".student-list").append($message);
$message.hide();


//Create a new page link element
function createPageLink(pageNumber) {
	var $listItem = $("<li></li>");
	var $pageLink = $("<a href = '#'></a>");
	$pageLink.text(pageNumber);
	$listItem.append($pageLink);
	return $listItem;
}

//Create the appropriate number of page links, append to $paginationList
function createPagination() {
	for(var i = 1; i <= numberOfPages; ++i) {
		var $newLink = createPageLink(i);
		$paginationList.append($newLink);
	}
}

//Create pagination and append it to the page
createPagination();
$pagination.append($paginationList);
$(".page").append($pagination);


//When searchButton is clicked
$searchButton.click(function() {
	//Get value from $searchInput
	var $searchString = $inputSearch.val().toLowerCase();
	//If input is empty, show current page
	if(!$searchString) {
		$(".active").click();
	} else {
	//Show students that match the search
		$(".student-list li").each(function() {
			var $name = $(this).find("h3").text();
			($name.indexOf($searchString) !== -1) ? $(this).show() : $(this).hide();
		});
	//Whem no matches are found, show appropriate message
	if($(".student-list li:visible").length === 0) {
		$message.show();		
	}
	}
});


//When page links are clicked
$paginationList.on("click", "a", function(){
	$message.hide();
	//Add class "active" to current page link
	$(".pagination a").removeClass("active");
	$(this).addClass("active");
	//Update min and max values
	max = $(this).text() * 10;
	min = max - 10;
	//Select and show appropriate list entries, hide other entries
	$students.hide();
	$students.slice(min,max).show();

});


//When page loads, trigger click event to show first 10 students
$(".pagination a").first().click();