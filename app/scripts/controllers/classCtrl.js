'use strict';


angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', 'TotalSitins', function ($scope, $cookies, $rootScope, $http, TotalSitins) {



		//Checks cookie to find current user cookies
		//in order to repopulate global user data
		//***Code duplicated in dateCtrl
		if($rootScope.currentUser === undefined){
			$rootScope.currentUser ={
				'name': $cookies.name,
				'avatar': $cookies.avatar,
				'email': $cookies.email,
				'sitins': $cookies.sitins
			};
		}



		//Variable built just to run an instance of TotalSitins.
		//TotalSitins primary function is to  add items to $rootScope
		var ts = TotalSitins;
		console.log(ts);//necessary for jshint



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

			})
			.error(function(data){
				console.log('get class names error', data);
			});






	}]);
