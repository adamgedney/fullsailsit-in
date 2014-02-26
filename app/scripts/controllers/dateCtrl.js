'use strict';


angular.module('fullsailsitinApp')
	.controller('DateCtrl', ['$scope', '$routeParams', '$http', '$rootScope', '$cookies', '$location', 'GetSitins', 'SendNotice', function ($scope, $routeParams, $http, $rootScope, $cookies, $location, GetSitins, SendNotice) {

		$rootScope.currentUser = {};

		//State control
		$rootScope.loginObject.$getCurrentUser().then(function(user){
			if(!user){
				$location.path('/');
			}else{

				//runs GetSitins to generate
				//user total on the rootScope
				var gs = new GetSitins(user.displayName);
				console.log(gs, $rootScope.currentUser.sitins);

				//Repopulates currentUser on page load
				$rootScope.currentUser.name = user.displayName;
				$rootScope.currentUser.avatar = user.avatar_url;// jshint ignore:line
				$rootScope.currentUser.email = user.email;
				$rootScope.currentUser.id = user.uid;
			}
		});




		//runs GetSitins to generate
		//user total on the rootScope
		var gs = GetSitins;
		console.log(gs);


		//=========================================
		//GET class dates where acronyms match from API
		//=========================================
		//passing GET parameter in url as a hack. Using the data parameter
		//in $http wasn't working
		var requestUrl = $rootScope.DIR + '/get-dates' + '?data=' + $routeParams.acro;

		//sets up details obj
		$rootScope.classDetails = {};

		//requests dates from API
		$http({method:'GET', url: requestUrl})
			.success(function(data){

				//adds date object to scope, then adds
				//acronym and fullname to object
				$rootScope.classDetails = data;
				$rootScope.classDetails.name = $routeParams.acro;
				$rootScope.classDetails.fullName = $rootScope.classHash[$routeParams.acro];

			})
			.error(function(data, status, headers){
				console.log('get class names error', data, status, headers);
			});








		//=========================================
		//Send notification, MODAL WINDOW handlers
		//=========================================
		var sn = SendNotice;
		console.log(sn);


	}]);
