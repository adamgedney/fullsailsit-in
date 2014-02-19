'use strict';

angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', function ($scope) {
		console.log('running classCtrl');

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
