'use strict';

/*global Firebase*/
angular.module('fullsailsitinApp')
	.factory('FireConn', ['$firebase', function ($firebase){

		return {
			connection: function(path){

				//attended/
				//users/
				var url = 'https://sitin.firebaseio.com/'+ path;
				var instance = new Firebase(url);

				return $firebase(instance);
			}
		};


	}]);
