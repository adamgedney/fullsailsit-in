'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('TotalSitins', ['$rootScope', '$cookies', function ($rootScope, $cookies){

		var obj = {};
		obj.attendedArray = [];

		var fb = new Firebase('https://sitin.firebaseio.com/attended/');
		// var user = $rootScope.currentUser.name;
		var user = $cookies.name;

		fb.on('child_added', function(snapshot){

			if(snapshot.val().user === user){
				obj.attendedArray.push(snapshot.val());

				//Runs up the value on the .sitins property
				//probably not the most efficient way to handle this
				//async callback
				$rootScope.currentUser.sitins = obj.attendedArray.length;
				$cookies.sitins = obj.attendedArray.length; //**Cookie not setting????

			//Get sitin classes here
		    //Renders in the header view
		    $rootScope.sitins = obj.attendedArray;
			}
		});

		return obj;

	}]);
