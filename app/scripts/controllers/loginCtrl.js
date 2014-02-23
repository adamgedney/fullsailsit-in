'use strict';

/* global Firebase*/
angular.module('fullsailsitinApp')
	.controller('loginCtrl', ['$scope', '$rootScope', '$window', '$cookies', function ($scope, $rootScope, $window, $cookies) {

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

						$window.location.href = '#/sitin';

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

			var fb = new Firebase('https://sitin.firebaseio.com/users/');

			//Client side query to test for existing user
			//in Firebase. If not found, throws a 'false'
			//synchronously picked up by the !match condition below
			fb.on('child_added', function(snapshot){

				console.log(snapshot.val(), snapshot.val().name, $rootScope.currentUser.name);

				if(snapshot.val().name !== $rootScope.currentUser.name){
					//when no user exists, set a new user to firebase
					fb.child($rootScope.currentUser.id).set($rootScope.currentUser);
				}
			});


			//Set the current user cookies
			setUserCookies();

		}// checkUser()






		function setUserCookies(){
			$cookies.name = $rootScope.currentUser.name;
			$cookies.avatar = $rootScope.currentUser.avatar;
			$cookies.email = $rootScope.currentUser.email;
		}



	}]);