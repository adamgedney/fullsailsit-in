'use strict';

/* global DIR */
angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', '$location', 'GetSitins', 'SendNotice', function ($scope, $cookies, $rootScope, $http, $location, GetSitins, SendNotice) {

		//State control
		$rootScope.loginObject.$getCurrentUser().then(function(user){
			if(!user){
				$location.path('/');
			}else{
				//Checks cookie to find current user cookies
				//in order to repopulate global user data
				//***Code duplicated in dateCtrl
				if($rootScope.currentUser === undefined){
					$rootScope.currentUser ={
						'name': $cookies.name,
						'avatar': $cookies.avatar,
						'email': $cookies.email
					};
				}
			}
		});




		//runs GetSitins to generate
		//user total on the rootScope
		var gs = GetSitins;
		console.log(gs);






		//GET class names from API
		var requestUrl = DIR + '/get-classes';
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
