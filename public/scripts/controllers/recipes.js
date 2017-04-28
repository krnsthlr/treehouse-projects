(function(){
	'use strict';

	angular.module('app')
		.controller('RecipesController', function(dataService, $location) {

			var vm = this;

			dataService.getCategories(function(response){
				vm.categories = response.data;
			});

			vm.getRecipes = function(){
				dataService.getRecipes(function(response){
				vm.recipes = response.data;
				});
			};

			vm.deleteRecipe = function(id) {
				dataService.deleteRecipe(id, function(response) {
				vm.getRecipes();
				});
			};

			vm.newRecipe = function(){
				$location.path('/add');
			};

			vm.updateId = function(id) {
				return dataService.currentId = id;
			}

			vm.recipes = vm.getRecipes();
	});

})();


