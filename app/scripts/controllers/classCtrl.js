'use strict';

angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', '$location', 'GetSitins', 'SendNotice', function ($scope, $cookies, $rootScope, $http, $location, GetSitins, SendNotice) {

		//creates the obj
		$rootScope.currentUser = {};

		//State control
		$rootScope.loginObject.$getCurrentUser()
			.then(function(user){
				if(!user){
					$location.path('/');
				}else{

					//runs GetSitins to generate
					//user total on the rootScope
					var gs = new GetSitins(user.displayName);
					console.log(gs, 'gs');

					//Repopulates currentUser on page load
					$rootScope.currentUser.name = user.displayName;
					$rootScope.currentUser.avatar = user.avatar_url;// jshint ignore:line
					$rootScope.currentUser.email = user.email;
					$rootScope.currentUser.id = user.uid;
					$rootScope.currentUser.sitins = $rootScope.sitins.length;
				}
			});

		// $rootScope.currentUser.sitins = '12';


		//runs GetSitins to generate
		// //user total on the rootScope
		// var gs = GetSitins(user.displayName);
		// console.log(gs);






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
