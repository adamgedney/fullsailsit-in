'use strict';

angular.module('fullsailsitinApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = 'billy bob McQueen';
    $scope.acronym = 'WDF';
    $scope.className = 'Web Design Fundamentals';
    $scope.dateTime = ' 12/12/14 1:24pm';
    $scope.animate = {};

    var toggle = false;

    $scope.slideout = function(){

			if(!toggle){
				$scope.animate.type = 'fadeInRightBig';
				$scope.slideoutSwitch = true;

		    toggle = true;


			}else{
				$scope.animate.type = 'fadeOutRightBig';
				setTimeout(switchFalse, 1000);

		    toggle = false;

			}


		};


		function switchFalse(){
			$scope.slideoutSwitch = false;
		}

	});
