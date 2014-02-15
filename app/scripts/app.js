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
        templateUrl: 'views/tempSitin.tpl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
