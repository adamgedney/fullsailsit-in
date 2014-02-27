'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('GetSitins', ['$rootScope','$firebase', '$filter', function ($rootScope, $firebase, $filter){

			var fb = new Firebase('https://sitin.firebaseio.com/attended/');


			// var fb = new Firebase('https://sitin.firebaseio.com/users/'+$rootScope.cuurentUser.uid+"/attended");
			// $scope.attended = $firebase(fb);


			// new Firebase('https://sitin.firebaseio.com/users/'+$rootScope.cuurentUser.uid+"/attended"+balls);

			var attended = $firebase(fb);
			var userAttended = [];

			attended.$on('loaded',function()
			{
				//Not sure what this is. Rachel wrote it.
				var array = $filter('toArray')(attended);

				for(var i=0;i<array.length;i++){
					if(array[i].user === $rootScope.currentUser.name){
						userAttended.push(array[i]);
					}
				}

				$rootScope.currentUser.sitins = userAttended.length;


			});

			// var attendedArray = [];

			// fb.on('child_added', function(snapshot){

			// 	if(snapshot.val().user === $rootScope.currentUser.name){
			// 		attendedArray.push(snapshot.val());
			// 	}
			// 	// console.log(attendedArray, $rootScope.currentUser.name);

			// 	//Runs up sitins to array length on child_added event
			// 	$rootScope.currentUser.sitins = attendedArray.length;

			// //Get sitin classes here
		 //    //Renders in the header view..
		 //    $rootScope.sitins = attendedArray;

			// });


		}]);
