'use strict';


angular.module('fullsailsitinApp')
	.controller('ClassCtrl', ['$scope', '$cookies', '$rootScope', '$http', 'TotalSitins', function ($scope, $cookies, $rootScope, $http, TotalSitins) {

		//"globals"
		// var attendedArray = [];



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

		// totalSitins();
		console.log('totalsitins', TotalSitins);

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




		// //calculates the total sitins, then adds them to the root scope
		// //**Need to add this as some sort of service so it'll run
		// //on ever page load.
		// function totalSitins(){//jshint ignore:line
		// 	var fbAtt = new Firebase('https://sitin.firebaseio.com/attended/');
		// 	var user = $rootScope.currentUser.name;

		// 	fbAtt.on('child_added', function(snapshot){

		// 		if(snapshot.val().user === user){
		// 			attendedArray.push(snapshot.val());

		// 			//Runs up the value on the .sitins property
		// 			//probably not the most efficient way to handle this
		// 			//async callback
		// 			$rootScope.currentUser.sitins = attendedArray.length;
		// 			$cookies.sitins = attendedArray.length; //**Cookie not setting????

		// 		//Get sitin classes here
		// 	    //Renders in the header view
		// 	    $rootScope.sitins = attendedArray;
		// 		}
		// 	});
		// }




	}]);
