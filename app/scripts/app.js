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



    //Instructor email hash table
    // $rootScope.emailHash = {
    //   'WFP1': 'ealmeida@fullsail.com',
    //   'WIU': 'cburke@fullsail.com',
    //   'RMO': 'acampos@fullsail.com',
    //   'PWA1': 'lmodomo@fullsail.com',
    //   'WIA': 'dwilliams@fullsail.com',
    //   'MDD': 'cchapman@fullsail.com',
    //   'PWA2': 'swaiman@fullsail.com',
    //   'SSL': 'tsmith@fullsail.com',
    //   'DBS': 'jcabibbo@fullsail.com',
    //   'FWF': 'sbernath@fullsail.com'
    // };
    $rootScope.emailHash = {
      'WFP1': 'adam.gedney@gmail.com',
      'WIU': 'adam.gedney@gmail.com',
      'RMO': 'adam.gedney@gmail.com',
      'PWA1': 'adam.gedney@gmail.com',
      'WIA': 'adam.gedney@gmail.com',
      'MDD': 'adam.gedney@gmail.com',
      'PWA2': 'adam.gedney@gmail.com',
      'SSL': 'adam.gedney@gmail.com',
      'DBS': 'adam.gedney@gmail.com',
      'FWF': 'adam.gedney@gmail.com'
    };



  }]);

