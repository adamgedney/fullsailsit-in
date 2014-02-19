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
      controller: 'loginCtrl'
    })
    .when('/loggedin', {
      templateUrl: 'views/sitin.tpl',
      controller: 'MainCtrl'
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