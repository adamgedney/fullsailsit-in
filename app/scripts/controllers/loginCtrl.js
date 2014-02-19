'use strict';

angular.module('fullsailsitinApp')
	.controller('loginCtrl', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) {

		//Called by the login button on the home page
		$scope.loginUser = function(){

			//Runs the angularfire login method
			//with a callback for success
			$rootScope.loginObject.$login('github')
				.then(function(user){

					//Controls login auth and forces route.
					//Sends user to sitin page if user has been authed by firebase
					if(user !== null){
						$window.location.href = '#/sitin';
					}
				},function(error){
					console.log(error, 'user auth failed');
				});
		};
	}]);