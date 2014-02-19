'use strict';

angular.module('fullsailsitinApp')
  .controller('MainCtrl', ['$scope', 'FireConn', function ($scope, FireConn) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = 'Billy Bob McQueen';
    $scope.acronym = 'PPP';
    $scope.date = 'Wed. 12/12';
    $scope.time = '1:15pm';
    $scope.className = 'Principles of Production Process';
    $scope.dateTime = ' Wed. 12/12 1:24pm';
    $scope.currentMonth = 'February';
    $scope.instructor = 'John Cabibo';
    $scope.animate = {};
    console.log(FireConn);

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



		$scope.confirm = function(){
			$scope.showModal = true;
		};

		function switchFalse(){
			$scope.slideoutSwitch = false;
		}

	}]);
