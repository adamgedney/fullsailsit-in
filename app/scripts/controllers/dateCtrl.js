'use strict';

angular.module('fullsailsitinApp')
	.controller('DateCtrl', ['$scope', '$routeParams', '$http', '$rootScope', '$cookies', 'TotalSitins', 'SendNotice', function ($scope, $routeParams, $http, $rootScope, $cookies, TotalSitins, SendNotice) {




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
		$rootScope.classDetails = {};

		//requests dates from API
		$http({method:'GET', url: requestUrl})
			.success(function(data){

				//adds date object to scope, then adds
				//acronym and fullname to object
				$rootScope.classDetails = data;
				$rootScope.classDetails.name = $routeParams.acro;
				$rootScope.classDetails.fullName = $rootScope.classHash[$routeParams.acro];

			})
			.error(function(data, status, headers){
				console.log('get class names error', data, status, headers);
			});








		//=========================================
		//Send notification, MODAL WINDOW handlers
		//=========================================
		var sn = SendNotice;
		console.log(sn);


	}]);
