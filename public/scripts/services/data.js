(function() {
	'use strict';

	angular.module('app')
		.service('dataService', function($http) {

			var baseUrl = 'http://localhost:5000/';

			/** shares current recipe._id between Recipe & RecipeDetail Ctrls */
			this.currentId = '';

			this.getRecipes = function(successHandler, errHandler) {
				$http.get(baseUrl + 'api/recipes')
					.then(successHandler)
					.catch(errHandler);
			};

			this.getCategories = function(successHandler, errHandler) {
				$http.get(baseUrl + 'api/categories')
					.then(successHandler)
					.catch(errHandler);
			};

			this.getFoodItems = function(successHandler, errHandler) {
				$http.get(baseUrl + 'api/fooditems')
					.then(successHandler)
					.catch(errHandler);
			};

			this.getRecipeByCategory = function(category, successHandler, errHandler) {
				$http.get(baseUrl + 'api/recipes?category=' + category)
					.then(successHandler)
					.catch(errHandler);
			};

			this.getRecipeById = function(id, successHandler, errHandler){
				if(id === '') return;
				$http.get(baseUrl + 'api/recipes/' + id)
					.then(successHandler)
					.catch(errHandler);
			};

			this.updateRecipe = function(id, recipe, resHandler, errHandler) {
				$http.put(baseUrl + 'api/recipes/' + id, recipe)
					.then(resHandler)
					.catch(errHandler);
			};

			this.addRecipe = function(recipe, resHandler, errHandler) {
				$http.post(baseUrl + 'api/recipes', recipe)
					.then(resHandler)
					.catch(errHandler);
			};

			this.deleteRecipe = function(id, successHandler, errHandler) {
				$http.delete(baseUrl + 'api/recipes/' + id)
					.then(successHandler)
					.catch(errHandler);
			};
			
	});
})();
