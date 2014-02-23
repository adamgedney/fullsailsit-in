'use strict';

angular.module('fullsailsitinApp')
	.controller('loginCtrl', ['$scope', '$rootScope', '$window', '$cookies', 'FireConn', function ($scope, $rootScope, $window, $cookies, FireConn) {

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

			// var fb = new Firebase('https://sitin.firebaseio.com/users/');
			var fb = new FireConn.connection('users');
			var userArray = [];
			var match = true;

			console.log(fb, 'fireeeee');

			//retrieves & stores all usernames from Firebase
			fb.$on('child_added', function(snapshot){
				userArray.push(snapshot.val());

				console.log('fireconn snap', snapshot.val(), fb);
			});

			//Client side query to test for existing user
			//in Firebase. If not found, throws a 'false'
			//synchronously picked up by the !match condition below
			for( var i=0; i<userArray.length; i++){
				if(userArray[i].name === $rootScope.currentUser.name){
					match = true;

				}else{
					match = false;
				}
			}

			//adds username as primary key
			//under which the user data object is placed &
			//sets a username cookie
			if(!match){
				fb.child($rootScope.currentUser.name).set($rootScope.currentUser);
			}

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