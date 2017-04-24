(function() {
	'use strict';

	angular.module('app')
		.service('dataService', function($http) {

			var baseUrl = 'http://localhost:5000/';

			this.getRecipes = function(callback) {
				$http.get(baseUrl + 'api/recipes').then(callback);
			};

			this.getCategories = function(callback) {
				$http.get(baseUrl + 'api/categories').then(callback);
			};
	});
})();
