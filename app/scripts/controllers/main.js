'use strict';

angular.module('fullsailsitinApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = 'billy bob McQueen';
    $scope.acronym = 'WDF';
    $scope.className = 'Web Design Fundamentals';
    $scope.dateTime = ' 12/12/14 1:24pm';

  });
