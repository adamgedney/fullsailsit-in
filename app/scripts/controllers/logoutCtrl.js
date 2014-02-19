'use strict';

angular.module('fullsailsitinApp')
	.controller('logoutCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		console.log($scope);

		$scope.logoutUser = function(){
			$rootScope.loginObject.$logout();

		}

	}]);
