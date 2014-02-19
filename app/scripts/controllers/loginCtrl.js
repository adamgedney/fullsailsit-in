'use strict';

angular.module('fullsailsitinApp')
	.controller('loginCtrl', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) {

		//controls login auth and route
		if($rootScope.loginObject){
			$window.location.href = '#/sitin';
		}

	}]);
