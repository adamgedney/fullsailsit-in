'use strict';

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

		//acronym passed through url for querying API
		var acro = $routeParams.a;

		//GET class dates where acronyms match from API
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

				console.log(classInst);


			})
			.error(function(data, status, headers){
				console.log('get class names error', data, status, headers);
			});




		//Send notification, MODAL WINDOW handlers
		$scope.confirm = function(currentIndex){


			$scope.showModal = true;

			//Hit API for the instructor's name, then check name against
			//hash table, adding class, date, and time to modal.
			console.log(currentIndex);
			$scope.currentIndex = currentIndex;
		};

		$scope.cancel = function(){
			$scope.showModal = false;
		};


	}]);
