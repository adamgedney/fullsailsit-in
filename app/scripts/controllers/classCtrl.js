'use strict';


angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', function ($scope, $cookies, $rootScope, $http) {

		//Checks cookie to find current user cookies
		//in order to repopulate global user data
		if($rootScope.currentUser === undefined){
			$rootScope.currentUser ={
				'name': $cookies.name,
				'avatar': $cookies.avatar,
				'email': $cookies.email
			};
		}


		//Class name Hash table
		var classHash = {
			'WFP1': 'Web Final Project 1',
			'WIU': 'Web Interface & Usability',
			'RMO': 'Rich Media Optomization',
			'PWA1': 'Programming Web Applications 1',
			'WIA': 'Web Interaction & Animation',
			'MDD': 'Mobile Device Deployment',
			'PWA2': 'Programming Web Applications 2',
			'SSL': 'Server Side Languages',
			'DBS': 'Database Structures',
			'FWF': 'Front End Web Frameworks'
		};


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
					classNa.push(classHash[data[i].class]);
				}

				//sets scope data on success
				$scope.classData.classAcronyms = classAc;
				$scope.classData.classNames = classNa;

				console.log($scope.classData.classAcronyms, $scope.classData.classNames);
			})
			.error(function(data){
				console.log('get class names error', data);
			});





		$scope.acronym = 'PPP';
		$scope.date = 'Wed. 12/12';
		$scope.time = '1:15pm';
		$scope.className = 'Principles of Production Process';
		$scope.dateTime = ' Wed. 12/12 1:24pm';
		$scope.currentMonth = 'February';
		$scope.instructor = 'John Cabibo';

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
