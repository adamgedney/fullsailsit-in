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

						//Stores basic user data into Firebase if the user
						//doesn't already exist. **Added jshint ignore to allow the _ char
						$rootScope.currentUser = {
							'name' : user.username,
							'avatar' : user.avatar_url,// jshint ignore:line
							'email' : user.email
						};

						console.log($rootScope.currentUser);
					}
				},function(error){
					console.log(error, 'user auth failed');
				});
		};
	}]);