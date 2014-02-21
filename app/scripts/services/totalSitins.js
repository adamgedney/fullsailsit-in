'use strict';

/*global Firebase*/
angular.module('fullsailsitinApp')
	.factory('TotalSitins', ['$rootScope', '$cookies', function ($rootScope, $cookies){

		var attendedArray = [];

		var total = function(){//jshint ignore:line
			var fbAtt = new Firebase('https://sitin.firebaseio.com/attended/');
			var user = $rootScope.currentUser.name;

			fbAtt.on('child_added', function(snapshot){

				if(snapshot.val().user === user){
					attendedArray.push(snapshot.val());

					//Runs up the value on the .sitins property
					//probably not the most efficient way to handle this
					//async callback
					$rootScope.currentUser.sitins = attendedArray.length;
					$cookies.sitins = attendedArray.length; //**Cookie not setting????

				//Get sitin classes here
			    //Renders in the header view
			    $rootScope.sitins = attendedArray;
				}
			});
		};

		return total();

	}]);
