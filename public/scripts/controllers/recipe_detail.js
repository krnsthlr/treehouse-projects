'use strict';

angular.module('app')
	.controller('RecipeDetailController', function(dataService, $location) {

		var vm = this;
		vm.currentId = dataService.currentId;
		vm.location = $location.path();

		dataService.getRecipeById(vm.currentId, function(response){
			vm.recipe = response.data;
		});
		
	});