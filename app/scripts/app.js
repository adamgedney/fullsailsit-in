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
    .when('/dates/:a', {
      templateUrl: 'views/dates.tpl',
      controller: 'DateCtrl'
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



    //Class name Hash table
    $rootScope.classHash = {
      'WFP1': 'Web Final Project 1',
      'WIU': 'Web Interface & Usability',
      'RMO': 'Rich Media Optomization',
      'PWA1': 'Programming Web Applications 1',
      'WIA': 'Web Interaction & Animation',
      'MDD': 'Mobile Device Deployment',
      'PWA2': 'Programming Web Applications 2',
      'SSL': 'Server Side Languages',
      'DBS': 'Database Structures',
      'FWF': 'Front End Web Frameworks'
    };

  }]);

