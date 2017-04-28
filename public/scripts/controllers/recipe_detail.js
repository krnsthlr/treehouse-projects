'use strict';

angular.module('app')
	.controller('RecipeDetailController', function(dataService) {

		var vm = this;
		vm.currentId = dataService.currentId;

		dataService.getRecipeById(vm.currentId, function(response){
			vm.recipe = response.data;
		});
		
	});