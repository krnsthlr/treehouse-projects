(function(){
	'use strict';

	angular.module('app')
		.controller('RecipesController', function(dataService, $location) {

			var vm = this;
			vm.recipes = [];

			/** error handler */
			var errHandler = function(response) {
				console.log(response.config.url + ': ' +
					'Error ' + response.status + ': ' + response.statusText);
			};

/**
* ------------------------------------------------------------------------
* API calls
* ------------------------------------------------------------------------
*/			
			dataService.getCategories(function(response){
				vm.categories = response.data;
			}, errHandler);

			var getRecipes = function() {
				dataService.getRecipes(function(response){
					vm.recipes = response.data;
				}, errHandler);
			};

			vm.filterRecipes = function(category) {
				if (vm.selected === null) {
					getRecipes();
				} else {
					dataService.getRecipesByCategory(category, function(response){
						vm.recipes = response.data;
				}, errHandler)}
				
			};

			vm.recipes = getRecipes();

	/**
	* ----------------------------------------------------------------------
	* BUTTONS and LINKS
	* ----------------------------------------------------------------------
	*/
			vm.addRecipe = function(){
				$location.path('/add');
			};

			/** keeps track of the current recipe._id when 
			user clicks 'Edit' and is referred to '/edit/{id}'*/
			vm.updateId = function(id) {
				return dataService.currentId = id;
			};

			vm.deleteRecipe = function(id) {
				dataService.deleteRecipe(id, function(){
					for (var i in vm.recipes) {
						if(vm.recipes[i]._id === id) {
							vm.recipes.splice(i, 1);
						}
					}
				}, errHandler);
			};		

	});

})();


