'use strict';

/* global Firebase */
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

						//Stores basic user data into a global scope for sitewide use
						//when a user has been logged in. **Added jshint ignore to allow the _ char
						$rootScope.currentUser = {
							'name' : user.username,
							'avatar' : user.avatar_url,// jshint ignore:line
							'email' : user.email
						};

						//Checks for Firebase user.
						//Adds the user to the Firebase database for tracking
						checkAndPutUser();

					}
				},function(error){
					console.log(error, 'user auth failed');
				});
		};



		function checkAndPutUser(){
			var fb = new Firebase('https://sitin.firebaseio.com/users/');
			var userArray = [];
			var match = false;

			//retrieves & stores all usernames from Firebase
			fb.on('child_added', function(snapshot){
				userArray.push(snapshot.name());
			});

			//Sets up semi-structured data in Firebase
			//-ordered path: /users/{{name}}/Object
			//ONLY IF user is not already in database
			for( var i=0; i<userArray.length; i++){
				if(userArray[i] === $rootScope.currentUser.name){
					match = true;
				}else{
					match = false;
				}
			}

			//adds name username as primary key
			//under which the user data object is placed
			fb.child($rootScope.currentUser.name).set($rootScope.currentUser);


		}

	}]);