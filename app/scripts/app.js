'use strict';

/* global Firebase */
var App = angular.module('fullsailsitinApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
]);

App.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.tpl',
      controller: 'MainCtrl'
    })
    .when('/sitin', {
      templateUrl: 'views/sitin.tpl',
      controller: 'ClassCtrl'
    })
    .when('/dates', {
      templateUrl: 'views/dates.tpl',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});


App.run(['$firebaseSimpleLogin', '$rootScope', function($firebaseSimpleLogin, $rootScope){

    //reference to firebase
    var db = new Firebase('https://sitin.firebaseio.com');

    //sets up simple login
    $rootScope.loginObject = $firebaseSimpleLogin(db);

  }]);