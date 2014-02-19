'use strict';

angular.module('fullsailsitinApp')
	.controller('logoutCtrl', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) {

		//Called by logout buttons in app header or menu
		$scope.logoutUser = function(){

			//Logs user out of Github,
			//then spits them back to login page
			$rootScope.loginObject.$logout();
			$window.location.href = '#/';
		};

	}]);
