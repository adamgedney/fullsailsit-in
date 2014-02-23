'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('TotalSitins', ['$rootScope', function ($rootScope){


			var fb = new Firebase('https://sitin.firebaseio.com/attended/');
			var attendedArray = [];

			fb.on('child_added', function(snapshot){

				if(snapshot.val().user === $rootScope.currentUser.name){
					attendedArray.push(snapshot.val());

					//Runs up the value on the .sitins property
					//probably not the most efficient way to handle this
					//async callback
					$rootScope.currentUser.sitins = attendedArray.length;

				//Get sitin classes here
			    //Renders in the header view..
			    $rootScope.sitins = attendedArray;
				}
			});
		}]);
