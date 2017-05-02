'use strict';

angular.module('app')
	.controller('RecipeDetailController', function(dataService, $location) {

		var vm = this;
		vm.currentId = dataService.currentId;
		vm.location = $location.path();

		dataService.getCategories(function(response){
			vm.categories = response.data;
		});

		dataService.getFoodItems(function(response){
			vm.foodItems = response.data;
		});

		dataService.getRecipeById(vm.currentId, function(response){
			vm.recipe = response.data;
		});

		vm.deleteIngredient = function($index){
			vm.recipe.ingredients.splice($index, 1);
		};
		
		vm.addIngredient = function(){
			if(vm.recipe === undefined || vm.recipe.ingredients === undefined)  {
				vm.recipe = {};
				vm.recipe.ingredients = [];
			}
			var ingredient = {
				foodItem: '',
				condition: '',
				amount: ''
			}
			vm.recipe.ingredients.push(ingredient);
		};

		vm.deleteStep = function($index) {
			vm.recipe.steps.splice($index, 1);
		};

		vm.addStep = function(){
			if(vm.recipe === undefined || vm.recipe.steps === undefined) {
				vm.recipe = {};
				vm.recipe.steps = [];
			}
			var step = {
				description: ''
			}
			vm.recipe.steps.push(step);
		};
	});