(function() {
	'use strict';

	angular.module('app')
		.service('dataService', function($http) {

			var baseUrl = 'http://localhost:5000/';

			this.currentId = '';

			this.getRecipes = function(callback) {
				$http.get(baseUrl + 'api/recipes').then(callback);
			};

			this.getCategories = function(callback) {
				$http.get(baseUrl + 'api/categories').then(callback);
			};

			this.getRecipeById = function(id, callback){
				$http.get(baseUrl + 'api/recipes/' + id).then(callback);
			};

			this.deleteRecipe = function(id, callback) {
				$http.delete(baseUrl + 'api/recipes/' + id).then(callback);
			}
	});
})();
