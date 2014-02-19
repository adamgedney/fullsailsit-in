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
							'email' : user.email,
							'added' : getDatetime()
						};

						//Checks if user exists in Firebase. If not,
						//adds the user for tracking
						checkAndPutUser();

					}
				},function(error){
					console.log(error, 'user auth failed');
				});
		};



		function checkAndPutUser(){
			var fb = new Firebase('https://sitin.firebaseio.com/users/');
			var userArray = [];
			var match = true;

			//retrieves & stores all usernames from Firebase
			fb.on('child_added', function(snapshot){
				userArray.push(snapshot.name());
			});

			//Client side query to test for existing user
			//in Firebase. If not found, throws a 'false'
			//synchronously picked up by the !match condition below
			for( var i=0; i<userArray.length; i++){
				if(userArray[i] === $rootScope.currentUser.name){
					match = true;
				}else{
					match = false;
				}
			}

			//adds username as primary key
			//under which the user data object is placed
			if(!match){
				fb.child($rootScope.currentUser.name).set($rootScope.currentUser);
			}
		}



		function getDatetime(){
			// datetime on 12 hr clock
			var d = new Date();
			var	day = d.getDay();
			var month = d.getMonth() + 1;
			var year = d.getFullYear();
			var hour = d.getHours();
			var minutes = d.getMinutes();
			var time;
			if(hour >= 13){
				hour = hour - 12;
				time = hour + ':' + minutes;

				time += 'pm';
			}

			return month + '/' + day + '/' + year + ' ' + time;
		}

	}]);