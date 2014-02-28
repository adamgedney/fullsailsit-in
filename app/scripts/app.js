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
  .when('/dates/:acro', {
    templateUrl: 'views/dates.tpl',
    controller: 'DateCtrl'
  })
  .when('/attended', {
    templateUrl: 'views/attended.tpl',
    controller: 'DateCtrl'
  })
  .when('/404', {
    templateUrl: 'views/404.tpl'
  })
  .otherwise({
    redirectTo: '404'
  });
});









App.run(['$firebaseSimpleLogin', '$rootScope', '$firebase', function($firebaseSimpleLogin, $rootScope, $firebase){

  //reference to firebase
  var db = new Firebase('https://sitin.firebaseio.com');
  //sets up simple login
  $rootScope.loginObject = $firebaseSimpleLogin(db);


  //Defines server root for API
  // $rootScope.DIR = 'http://127.0.0.1:8887/public';
  $rootScope.DIR = 'http://107.170.58.66/';

  //Adds objs to scope to prevent interpolation errors
  //on page loads
  $rootScope.modal = {
    'day' : '',
    'start' : ''
  };

  //instantiates objs
  $rootScope.sitins = [];
  $rootScope.currentUser = {};




  //Builds currentUser on app load.
  //Mainly for page refreshes
  $rootScope.loginObject.$getCurrentUser()
  .then(function(user){
    if(user){
      //Populates currentUser on page load
      $rootScope.currentUser.name = user.displayName;
      $rootScope.currentUser.id = user.uid;


      var fb = new Firebase('https://sitin.firebaseio.com/users/' + $rootScope.currentUser.id + '/attended');

      //Uses this in sendNotice factory
      $rootScope.sitins = $firebase(fb);
    }
  });



  //Class name Hash table
  $rootScope.classHash = {
    'WFP1': 'Web Final Project 1',
    'WIU': 'Web Interface & Usability',
    'RMO': 'Rich Media Optimization',
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

  // $rootScope.emailHash = {
  //   'WFP1': 'christopher.chapman@me.com',
  //   'WIU': 'christopher.chapman@me.com',
  //   'RMO': 'christopher.chapman@me.com',
  //   'PWA1': 'christopher.chapman@me.com',
  //   'WIA': 'christopher.chapman@me.com',
  //   'MDD': 'christopher.chapman@me.com',
  //   'PWA2': 'christopher.chapman@me.com',
  //   'SSL': 'christopher.chapman@me.com',
  //   'DBS': 'christopher.chapman@me.com',
  //   'FWF': 'christopher.chapman@me.com'
  // };


}]);// app.run



//Filters obj to array: Rachel wrote this
App.filter('toArray', function () {
  return function (obj) {
    if (!(obj instanceof Object)) {
      return obj;
    }

    return Object.keys(obj).filter(function(key){if(key.charAt(0) !== '$') {return key;}}).map(function (key) {
      return Object.defineProperty(obj[key], '$key', {value: key});
    });
  };
});




//Filters for array length in view : Rachel wrote this
App.filter('length', function(){

  return function(array)
  {
    return array.length;
  };
});





//Filter to convert SQL date string to a new format
App.filter('formatDateString',  function formatDateString($filter){

  return function(str){
    //replaces - with /
    var  d = new Date(str.replace(/-/g,'/'));

    //returns a newy structured js date object
    return $filter('date')(d, 'MMM-dd-yyyy @ h:mma');
  };
});
