(function(){
	'use strict';

	angular.module('app')
		.controller('RecipesController', function(dataService, $location) {

			var vm = this;
			vm.recipes = [];

			/** generic error handler */
			var errHandler = function(response) {
				console.log(response.config.url + ': ' +
					'Error ' + response.status + ': ' + response.statusText);
			};

			/** API calls */
			dataService.getRecipes(function(response){
				vm.recipes = response.data;
			}, errHandler);

			dataService.getCategories(function(response){
				vm.categories = response.data;
			}, errHandler);

			/** delete and add functionality */
			vm.deleteRecipe = function(id) {
				dataService.deleteRecipe(id, function(){
					for (var i in vm.recipes) {
						if(vm.recipes[i]._id === id) {
							vm.recipes.splice(i, 1);
						}
					}
				}, errHandler);
			};

			vm.addRecipe = function(){
				$location.path('/add');
			};

			vm.updateId = function(id) {
				return dataService.currentId = id;
			};

	});

})();


