'use strict';

/* global Firebase */
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
							'added' : getDatetime()
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
			// var fb = FireConn('users');// jshint ignore:line
			var match;

			// console.log(fb, 'fireeeee');

			//Client side query to test for existing user
			//in Firebase. If not found, throws a 'false'
			//synchronously picked up by the !match condition below
			fb.$on('child_added', function(snapshot){
				var n = snapshot.snapshot.value.name;
				console.log(snapshot.snapshot.value.name, $rootScope.currentUser.name, fb);
				if(n.toString() === $rootScope.currentUser.name){
					match = true;

				}else{
					match = false;

					//pushes new user data to db
					// fb.$add($rootScope.currentUser);
				}
			});

			//adds username as primary key
			//under which the user data object is placed &
			//sets a username cookie
			if(!match){
				fb.$add($rootScope.currentUser);
			}
			// fb.$add($rootScope.currentUser);
			//Set the current user cookies
			setUserCookies();

			//Calculates total sitins. STORES A COOKIE of the number
			// totalSitins($rootScope.currentUser.name);

		}// checkUser()






		function setUserCookies(){
			$cookies.name = $rootScope.currentUser.name;
			$cookies.avatar = $rootScope.currentUser.avatar;
			$cookies.email = $rootScope.currentUser.email;
		}











		//Loops through firebase attended directory
		//searches for all entries where the user matches current user
		//stores entry in an array for use throughout the site.
		// function totalSitins(user){
		// 	var fbAtt = new Firebase('https://sitin.firebaseio.com/attended/');
		// 	var attendedArray = [];

		// 	fbAtt.on('child_added', function(snapshot){

		// 		if(snapshot.val().user === user){
		// 			attendedArray.push(snapshot.val());

		// 			//Runs up the value on the .sitins property
		// 			//probably not the most efficient way to handle this
		// 			//async callback
		// 			$rootScope.currentUser.sitins = attendedArray.length;
		// 		}

		// 	});
		// }








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