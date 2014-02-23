'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.controller('DateCtrl', ['$scope', '$routeParams', '$http', '$rootScope', '$cookies', 'TotalSitins', function ($scope, $routeParams, $http, $rootScope, $cookies, TotalSitins) {




		//Checks cookie to find current user cookies
		//in order to repopulate global user data
		if($rootScope.currentUser === undefined){
			$rootScope.currentUser ={
				'name': $cookies.name,
				'avatar': $cookies.avatar,
				'email': $cookies.email
			};
		}

		//runs TotalSitins to generate
		//user total on the rootScope
		var ts = TotalSitins;
		console.log(ts);



		//Default hides & resets modal confirmation message on page load
		$scope.showConfirmation = true;
		$scope.cancelButton = 'Cancel';
		$scope.buttonWidth = '';







		//=========================================
		//GET class dates where acronyms match from API
		//=========================================
		//passing GET parameter in url as a hack. Using the data parameter
		//in $http wasn't working
		var requestUrl = 'http://127.0.0.1:8887/public/get-dates' + '?data=' + $routeParams.acro;

		//sets up details obj
		$scope.classDetails = {};

		//requests dates from API
		$http({method:'GET', url: requestUrl})
			.success(function(data){

				//adds date object to scope, then adds
				//acronym and fullname to object
				$scope.classDetails = data;
				$scope.classDetails.name = $routeParams.acro;
				$scope.classDetails.fullName = $rootScope.classHash[$routeParams.acro];

			})
			.error(function(data, status, headers){
				console.log('get class names error', data, status, headers);
			});








		//=========================================
		//Send notification, MODAL WINDOW handlers
		//=========================================
		$scope.confirm = function(currentIndex, name, date){

			$scope.showModal = true;

			//Sets the current index for use in the sendNotice function below
			$scope.currentIndex = currentIndex;

			//If currentIndex == next, this means the click originated
			//from the add next class button. returnNext will query db
			//for the next class
			if(currentIndex === 'next'){

				// {{classDetails[currentIndex].instructor}}
				// {{classDetails.name}}
				// {{classDetails[currentIndex].day}}
				// {{classDetails[currentIndex].start}}
				returnNext(name, date);
			}
		};

		$scope.cancel = function(){
			$scope.showModal = false;

			//Removes confirmation message styles
			$scope.showConfirmation = true; //note** This boolean is backward
			$scope.cancelButton = 'Cancel';
			$scope.buttonWidth = '';
		};


		//Hit hash table for instructor's email, then check name against
		//hash table, adding class, date, and time to modal.
		$scope.sendNotice = function(){

			//pulls appropriate email address form hash table
			//based on current index acronym
			var instEmail = $rootScope.emailHash[$scope.classDetails.name];


			var emailUrl = 'http://127.0.0.1:8887/public/send-email' + '?' +
				'className=' + $scope.classDetails.fullName +
				'&day=' + $scope.classDetails[$scope.currentIndex].day +
				'&date=' + $scope.classDetails[$scope.currentIndex].start +
				'&instructor=' + $scope.classDetails[$scope.currentIndex].instructor +
				'&instEmail=' + instEmail +
				'&userEmail=' + $rootScope.currentUser.email +
				'&userName=' + $rootScope.currentUser.name;

			//Had to hack the url. POST method not working properly
			$http({method:'GET', url: emailUrl})
			.success(function(data, status, headers){
				console.log('email sent success', data, status, headers);

				$scope.showConfirmation = false;
				$scope.cancelButton = 'Close Window';
				$scope.buttonWidth = 'cancel-btn-wide';

				//Runs the function to add this booked class
				//to a running tally of sit ins.
				tallySitins();

			})
			.error(function(data, status, headers){
				console.log('email send error', data, status, headers);
			});
		};







		//Function pushes new sitins into the user object for tallying
		//This just assumes that the student keeps their appointment.
		//V2 functionality could be a checkin system for checking in while
		//attending a sitin.
		function tallySitins(){// jshint ignore:line

			var fbConn = new Firebase('https://sitin.firebaseio.com/attended/');

			var obj = {
				'classDate' : $scope.classDetails[$scope.currentIndex].start,
				'class' : $scope.classDetails.name,
				'user' : $rootScope.currentUser.name
			};

			// Builds a record of requested sitins on a unique timestamp
			//in the "attended" directory.
			fbConn.child(getTimestamp()).set(obj);
		}







		function returnNext(name, date){

			//add class acronym to request to query on
			var rUrl = 'http://127.0.0.1:8887/public/get-next' + '?class=' + name + '&date=' + date;

			$http({method:'GET', url: rUrl})
				.success( function(data){
					console.log(data, 'returnnext', name, date);
				})
				.error(function(data, status, headers){
					console.log('get class names error', data, status, headers);
				});
		}






		function getTimestamp(){
			var d = new Date();
			var	day = d.getDay();
			var month = d.getMonth() + 1;
			var year = d.getFullYear();
			var hour = d.getHours();
			var minutes = d.getMinutes();
			var ms = d.getMilliseconds();

			var	time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + minutes + ':' + ms;

			return time;
		}







	}]);
