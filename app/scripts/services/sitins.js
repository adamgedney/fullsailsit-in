'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('Sitins', ['$rootScope', function ($rootScope){

		var fbAtt = new Firebase('https://sitin.firebaseio.com/attended/');
		var attendedArray = [];
		var user = $rootScope.currentUser.name;

		fbAtt.on('child_added', function(snapshot){

			if(snapshot.val().user === user){
				attendedArray.push(snapshot.val());

				//Runs up the value on the .sitins property
				//probably not the most efficient way to handle this
				//async callback
				$rootScope.currentUser.sitins = attendedArray.length;
			}

		});

	}]);
