'use strict';

angular.module('fullsailsitinApp')
	.controller('logoutCtrl', ['$scope', '$rootScope', '$window', '$cookies', function ($scope, $rootScope, $window, $cookies) {

		//Called by logout buttons in app header or menu
		$scope.logoutUser = function(){

			//Logs user out of Github,
			//erases currentUSer scope data,
			//then spits them back to login page
			$rootScope.loginObject.$logout();
			$rootScope.currentUser = '';
			removeUserCookies();
			$window.location.href = '#/';


			//**set jshint to ignore my function call before declaration
			function removeUserCookies(){// jshint ignore:line
				$cookies.name = '';
				$cookies.avatar = '';
				$cookies.email = '';
				$cookies.sitins = '';
			}
		};

	}]);
