'use strict';


angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', function ($scope, $cookies, $rootScope, $http) {

		//Checks cookie to find current user cookies
		//in order to repopulate global user data
		if($rootScope.currentUser === undefined){
			$rootScope.currentUser ={
				'name': $cookies.name,
				'avatar': $cookies.avatar,
				'email': $cookies.email
			};
		}

		//GET class names from API
		var requestUrl = 'http://127.0.0.1:8887/public/get-classes';

		$http({method:'GET', url: requestUrl})
			.success(function(data, status, headers, config){
				console.log('get classes success', data, status, headers, config);

			})
			.error(function(data, status, headers, config){
				console.log('get class names error', data, status, headers, config);
			});





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
