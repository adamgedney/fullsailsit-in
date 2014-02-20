'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.controller('DateCtrl', ['$scope', '$routeParams', '$http', '$rootScope', '$cookies', function ($scope, $routeParams, $http, $rootScope, $cookies) {


		//Checks cookie to find current user cookies
		//in order to repopulate global user data
		if($rootScope.currentUser === undefined){
			$rootScope.currentUser ={
				'name': $cookies.name,
				'avatar': $cookies.avatar,
				'email': $cookies.email
			};
		}





		//Default hides & resets modal confirmation message on page load
		$scope.showConfirmation = true;
		$scope.cancelButton = 'Cancel';
		$scope.buttonWidth = '';

		//acronym passed through url for querying API
		var acro = $routeParams.a;










		//=========================================
		//GET class dates where acronyms match from API
		//=========================================
		//passing GET parameter in url as a hack. Using the data parameter
		//in $http wasn't working
		var requestUrl = 'http://127.0.0.1:8887/public/get-dates' + '?data=' + acro;
		var classDay = [];
		var classDate = [];
		var classTime = [];
		var classInst = [];
		$scope.classDates = {};
		$scope.classDates.name = acro;
		$scope.classDates.fullName = $rootScope.classHash[acro];

		$http({method:'GET', url: requestUrl})
			.success(function(data){

				//on success, loops through class date data, pushing into
				//an array delivery to ngRepeat.
				for(var i=0;i<data.length;i++){
					classDay.push(data[i].day);
					classDate.push(data[i].date);
					classTime.push(data[i].start.substr(11));
					classInst.push(data[i].instructor);
				}

				//sets scope data on success
				$scope.classDates.classDay = classDay;
				$scope.classDates.classDate = classDate;
				$scope.classDates.classTime = classTime;
				$scope.instructors = classInst;
				$scope.classDates.len = data;

			})
			.error(function(data, status, headers){
				console.log('get class names error', data, status, headers);
			});








		//=========================================
		//Send notification, MODAL WINDOW handlers
		//=========================================
		$scope.confirm = function(currentIndex){


			$scope.showModal = true;

			//Hit API for the instructor's name, then check name against
			//hash table, adding class, date, and time to modal.
			console.log(currentIndex);
			$scope.currentIndex = currentIndex;
		};

		$scope.cancel = function(){
			$scope.showModal = false;

			//Removes confirmation message styles
			$scope.showConfirmation = true; //note** This boolean is backward
			$scope.cancelButton = 'Cancel';
			$scope.buttonWidth = '';
		};


		//Hits the API to send an email to the instructor
		$scope.sendNotice = function(){

			//pulls appropriate email address form hash table
			//based on current index acronym
			var instEmail = $rootScope.emailHash[$scope.classDates.name];

			// var obj = {
			// 	'className': $scope.classDates.fullName,
			// 	'day': $scope.classDates.classDay[$scope.currentIndex],
			// 	'date': $scope.classDates.classDate[$scope.currentIndex],
			// 	'time': $scope.classDates.classTime[$scope.currentIndex],
			// 	'instructor': $scope.instructors[$scope.currentIndex],
			// 	'instEmail':instEmail,
			// 	'userEmail': $rootScope.currentUser.email,
			// 	'userName': $rootScope.currentUser.name
			// };
			// console.log(obj);


			var emailUrl = 'http://127.0.0.1:8887/public/send-email' + '?' +
				'className=' + $scope.classDates.fullName +
				'&day=' + $scope.classDates.classDay[$scope.currentIndex] +
				'&date=' + $scope.classDates.classDate[$scope.currentIndex] +
				'&time=' + $scope.classDates.classTime[$scope.currentIndex] +
				'&instructor=' + $scope.instructors[$scope.currentIndex] +
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
				console.log('get class names error', data, status, headers);
			});
		};







		//Function pushes new sitins into the user object for tallying
		//This just assumes that the student keeps their appointment
		//V2 functionality could be a checkin system for checking in while
		//attending a sitin.
		function tallySitins(){// jshint ignore:line

			var fbConn = new Firebase('https://sitin.firebaseio.com/attended/');

			var obj = {
				'classDate' : $scope.classDates.classDate[$scope.currentIndex],
				'class' : $scope.classDates.name,
				'user' : $rootScope.currentUser.name
			};

			// Builds a record of requested sitins on a unique timestamp
			//in the "attended" directory.
			fbConn.child(getTimestamp()).set(obj);
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





		//=========================================
		//Menu Slideout controller ** duplicate code. Code exists in loginCtrl as well
		//=========================================
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
