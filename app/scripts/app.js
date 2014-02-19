'use strict';

angular.module('fullsailsitinApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.tpl',
        controller: 'MainCtrl'
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
