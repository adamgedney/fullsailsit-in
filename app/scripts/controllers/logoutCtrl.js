'use strict';

angular.module('fullsailsitinApp')
	.controller('logoutCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {

		//Called by logout buttons in app header or menu
		$scope.logoutUser = function(){

			//Logs user out of Github,
			//erases currentUSer scope data,
			//then spits them back to login page
			$rootScope.loginObject.$logout();
			$rootScope.currentUser = '';
			$location.path('/');

		};

	}]);
