'use strict';

angular.module('fullsailsitin', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.tpl',
        controller: 'Home'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
