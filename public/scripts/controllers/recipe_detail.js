(function(){
	'use strict';

	angular.module('app')
		.controller('RecipeDetailController', function(dataService, $location) {

			var vm = this;
			vm.validationErrors = [];

			/** keeps track of the current recipe._id 
			(equals to an empty string on '/add' route) */
			vm.currentId = dataService.currentId;

			/** evaluates to '/add' or '/edit/{id}'*/
			vm.location = $location.path();

			/** response handler for 'updateRecipe'
			& saveRecipe*/
			var resHandler = function(response) {
				$location.path('/');
			};

			/** error handler */
			var errHandler = function(response) {
				vm.validationErrors = [];

				if(response.data.errors){
					var errors = response.data.errors;
					for(var item in errors) {
						vm.validationErrors.push(errors[item][0].userMessage);
					};
				} else {
					console.log(response.config.url + ': ' +
					'Error ' + response.status + ': ' + response.statusText);
				}
			};

/**
* ------------------------------------------------------------------------
* EDITING a recipe
* ------------------------------------------------------------------------
*/
			vm.deleteIngredient = function($index){
				vm.recipe.ingredients.splice($index, 1);
			};
		
			vm.addIngredient = function(){
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
				var step = {
					description: ''
				}
				vm.recipe.steps.push(step);
			};

/**
* ------------------------------------------------------------------------
* API calls
* ------------------------------------------------------------------------
*/
			dataService.getCategories(function(response){
				vm.categories = response.data;
			}, errHandler);

			dataService.getFoodItems(function(response){
				vm.foodItems = response.data;
			}, errHandler);

			vm.getRecipe = function() {
				if(vm.currentId === '') {
					return vm.recipe = {
						name: '',
						description: '',
						category: '',
						prepTime: null,
						cookTime: null,
						ingredients: [],
						steps: []
					};
					
				} else {
					dataService.getRecipeById(vm.currentId, function(response){
					vm.recipe = response.data;
					}, errHandler);
				}
			};

			vm.recipe = vm.getRecipe();

	/**
	* ----------------------------------------------------------------------
	* BUTTONS
	* ----------------------------------------------------------------------
	*/
			vm.cancel = function(){
				$location.path('/');
			};

			/** on '/edit/{id}' route */
			vm.updateRecipe = function(id, recipe) {
				dataService.updateRecipe(id, recipe, resHandler, errHandler);
			};

			/** on '/add' route */
			vm.addRecipe = function(recipe) {
				dataService.addRecipe(recipe, resHandler, errHandler);
			};
		
	});
})();