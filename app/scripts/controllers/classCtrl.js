'use strict';

angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', '$location', 'GetSitins', 'SendNotice', function ($scope, $cookies, $rootScope, $http, $location, GetSitins, SendNotice) {



		//State control
		$rootScope.loginObject.$getCurrentUser()
			.then(function(user){
				if(!user){
					$location.path('/');
				}
			});






		//GET class names from API
		var requestUrl = $rootScope.DIR + '/get-classes';
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



		//=========================================
		//Send notification, MODAL WINDOW handlers
		//=========================================
		var sn = SendNotice;
		console.log(sn);



	}]);
