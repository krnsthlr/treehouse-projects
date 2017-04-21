(function(){
	'use strict';

	angular.module('app')
		.controller('RecipesController', function(dataService) {

			var vm = this;

			dataService.getRecipes(function(response){
				vm.recipes = response.data;
			});
	});

})();


