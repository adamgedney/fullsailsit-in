'use strict';

angular.module('fullsailsitinApp')
  .controller('MenuCtrl', ['$scope', function ($scope) {


    var toggle = false;
    $scope.menu = {};

		$scope.slideout = function(){

			if(!toggle){
				$scope.menu.animate.fx = 'fadeInRightBig';
				$scope.menu.slideoutSwitch = true;

		    toggle = true;


			}else{
				$scope.menu.animate.fx = 'fadeOutRightBig';
				setTimeout(switchFalse, 1000);

		    toggle = false;

			}


		};


		function switchFalse(){
			$scope.menu.slideoutSwitch = false;
		}


	}]);
