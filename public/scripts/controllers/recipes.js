(function(){
	'use strict';

	angular.module('app')
		.controller('RecipesController', function(dataService, $location) {

			var vm = this;

			dataService.getRecipes(function(response){
				vm.recipes = response.data;
			});

			dataService.getCategories(function(response){
				vm.categories = response.data;
			});

			vm.newRecipe = function(){
				$location.path('/add');
			};
	});

})();


