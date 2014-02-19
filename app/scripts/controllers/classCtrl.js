'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', function ($scope, $cookies, $rootScope) {

		//Checks cookie to find current user
		//in order to repopulate global user data
		var currentUser = $cookies.currentUser;
		var fb = new Firebase('https://sitin.firebaseio.com/users/');
		var userArray = [];

		//retrieves & stores all usernames from Firebase
		fb.on('child_added', function(snapshot){
			userArray.push(snapshot);
		});

		//Client side query to find current user
		for( var i=0; i<userArray.length; i++){
			if(userArray[i].name === currentUser){

				//If a match is found, set currentUser to this object
				//populates data for return users
				$rootScope.currentUser = userArray[i];

			}
		}






		$scope.acronym = 'PPP';
		$scope.date = 'Wed. 12/12';
		$scope.time = '1:15pm';
		$scope.className = 'Principles of Production Process';
		$scope.dateTime = ' Wed. 12/12 1:24pm';
		$scope.currentMonth = 'February';
		$scope.instructor = 'John Cabibo';

		var toggle = false;
		$scope.menu = {};

		$scope.slideout = function(){

			if(!toggle){
				$scope.menu.animate = 'fadeInRightBig';
				$scope.menu.slideoutSwitch = true;

		    toggle = true;


			}else{
				$scope.menu.animate = 'fadeOutRightBig';
				setTimeout(switchFalse, 1000);

		    toggle = false;

			}


		};


		function switchFalse(){
			$scope.menu.slideoutSwitch = false;
		}







	}]);
