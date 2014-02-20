'use strict';


angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', function ($scope, $cookies, $rootScope, $http) {

		//Checks cookie to find current user cookies
		//in order to repopulate global user data
		if($rootScope.currentUser === undefined){
			$rootScope.currentUser ={
				'name': $cookies.name,
				'avatar': $cookies.avatar,
				'email': $cookies.email,
				'sitins': $cookies.sitins
			};
		}


		//GET class names from API
		var requestUrl = 'http://127.0.0.1:8887/public/get-classes';
		var classAc = [];
		var classNa = [];
		$scope.classData = {};

		$http({method:'GET', url: requestUrl})
			.success(function(data){

				//on success, loops through class data, pushing into
				//an array for pairing with hash table.
				for(var i=0;i<data.length;i++){
					classAc.push(data[i].class);
					classNa.push($rootScope.classHash[data[i].class]);
				}

				//sets scope data on success
				$scope.classData.classAcronyms = classAc;
				$scope.classData.classNames = classNa;

				// $cookies.sitins = $rootScope.currentUser.sitins;
				// console.log('test', $rootScope.currentUser.sitins);

			})
			.error(function(data){
				console.log('get class names error', data);
			});





		//menu slideout controller
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
