'use strict';

/*global Firebase*/
angular.module('fullsailsitinApp')
	.factory('FireConn', ['$firebase', function ($firebase){
		var url = 'https://sitin.firebaseio.com/attended/',
			instance = new Firebase(url);

		return $firebase(instance);
	}]);
