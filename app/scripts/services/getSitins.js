'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('GetSitins', ['$rootScope','$firebase', function ($rootScope,$firebase){

			var fb = new Firebase('https://sitin.firebaseio.com/attended/');

			$rootScope.attended = $firebase(fb);



		}]);
