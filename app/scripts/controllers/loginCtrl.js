'use strict';

/* global Firebase*/
angular.module('fullsailsitinApp')
	.controller('loginCtrl', ['$scope', '$rootScope', '$window', '$location', '$firebase', function ($scope, $rootScope, $window, $location, $firebase) {

		//=========================================
		//Called by the login button on the home page
		//=========================================
		$scope.loginUser = function(){

			//Runs the angularfire login method
			//with a callback for success
			$rootScope.loginObject.$login('github')
				.then(function(user){
					console.log(user);
					//Controls login auth and forces route.
					//Sends user to sitin page if user has been authed by firebase
					if(user !== null){

						//moves user into app
						$location.path('/sitin');

						//Stores basic user data into a global scope for sitewide use
						//when a user has been logged in. **Added jshint ignore to allow the _ char
						//** currentUser added to in the totalSitins function below
						$rootScope.currentUser = {
							'name' : user.displayName,
							'avatar' : user.avatar_url,// jshint ignore:line
							'email' : user.email,
							'id': user.uid
						};

						//Checks if user exists in Firebase. If not,
						//adds the user for tracking
						checkUser();
					}
				},function(error){
					console.log(error, 'user auth failed');
				});
		};






		function checkUser(){

			//reference to current user, if they eist, in fb
			var fb = $firebase(new Firebase('https://sitin.firebaseio.com/users/' + $rootScope.currentUser.id ));

			//queries fb for the user snapshot.
			//If it doesn't exist, we create the new user
			fb.$on('loaded', function(snapshot){
				console.log(snapshot);

				if(snapshot === null){
					console.log('user doesnt already exist');

					//when no user exists in fb, set a new user
					fb.$set($rootScope.currentUser);
				}else{
					console.log('user already exists');
				}
			});
		}// checkUser()



	}]);