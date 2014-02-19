'use strict';

angular.module('fullsailsitinApp')
	.controller('DateCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
		console.log($scope, $routeParams.a);

		//GET class dates where acronyms match from API
		var requestUrl = 'http://127.0.0.1:8887/public/get-dates';
		var classDay = [];
		var classDate = [];
		var classTime = [];
		$scope.classDates = {};

		$http({method:'GET', url: requestUrl})
			.success(function(data){

				//on success, loops through class date data, pushing into
				//an array delivery to ngRepeat.
				for(var i=0;i<data.length;i++){
					classDay.push(data[i].day);
					classDate.push(data[i].date);
					classTime.push(data[i].time);
				}

				//sets scope data on success
				$scope.classDates.classDay = classDay;
				$scope.classDates.classDate = classDate;
				$scope.classDates.classTime = classTime;

			})
			.error(function(data){
				console.log('get class names error', data);
			});


	}]);
