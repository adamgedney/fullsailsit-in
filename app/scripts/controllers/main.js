'use strict';

angular.module('fullsailsitinApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = 'Billy Bob McQueen';
    $scope.acronym = 'PPP';
    $scope.className = 'Principles of Production Process';
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

		$scope.chooseTime = function(){
			// $scope.showModal = true;
		};

		$scope.confirm = function(){
			$scope.showModal = true;
		};

		function switchFalse(){
			$scope.slideoutSwitch = false;
		}

	});
