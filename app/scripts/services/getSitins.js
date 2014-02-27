'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('GetSitins', ['$rootScope', function ($rootScope){

			var fb = new Firebase('https://sitin.firebaseio.com/attended/');
			var attendedArray = [];

			fb.on('child_added', function(snapshot){

				if(snapshot.val().user === $rootScope.currentUser.name){
					attendedArray.push(snapshot.val());
				}


				//Sets sitins to array length on value event
				$rootScope.currentUser.sitins = attendedArray.length;

			//Get sitin classes here
		    //Renders in the header view..
		    $rootScope.sitins = attendedArray;

			});


		}]);
