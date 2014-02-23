'use strict';
/* global Firebase */
var App = angular.module('fullsailsitinApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ]);
App.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/home.tpl',
      controller: 'MainCtrl'
    }).when('/sitin', {
      templateUrl: 'views/sitin.tpl',
      controller: 'ClassCtrl'
    }).when('/dates/:a', {
      templateUrl: 'views/dates.tpl',
      controller: 'DateCtrl'
    }).when('/attended', {
      templateUrl: 'views/attended.tpl',
      controller: 'DateCtrl'
    }).when('/404', { templateUrl: 'views/404.tpl' }).otherwise({ redirectTo: '404' });
  }
]);
App.run([
  '$firebaseSimpleLogin',
  '$rootScope',
  function ($firebaseSimpleLogin, $rootScope) {
    //reference to firebase
    var db = new Firebase('https://sitin.firebaseio.com');
    //sets up simple login
    $rootScope.loginObject = $firebaseSimpleLogin(db);
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
  }
]);
'use strict';
angular.module('fullsailsitinApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
angular.module('fullsailsitinApp').controller('ClassCtrl', [
  '$scope',
  '$cookies',
  '$rootScope',
  '$http',
  'TotalSitins',
  'MenuSlider',
  function ($scope, $cookies, $rootScope, $http, TotalSitins, MenuSlider) {
    //menu slideout controller
    $scope.menu = MenuSlider;
    //Checks cookie to find current user cookies
    //in order to repopulate global user data
    //***Code duplicated in dateCtrl
    if ($rootScope.currentUser === undefined) {
      $rootScope.currentUser = {
        'name': $cookies.name,
        'avatar': $cookies.avatar,
        'email': $cookies.email,
        'sitins': $cookies.sitins
      };
    }
    //Variable built just to run an instance of TotalSitins.
    //TotalSitins primary function is to  add items to $rootScope
    var ts = TotalSitins;
    console.log(ts);
    //necessary for jshint
    //GET class names from API
    var requestUrl = 'http://127.0.0.1:8887/public/get-classes';
    var classAc = [];
    var classNa = [];
    $scope.classData = {};
    $http({
      method: 'GET',
      url: requestUrl
    }).success(function (data) {
      //on success, loops through class data, pushing into
      //an array for pairing with hash table.
      for (var i = 0; i < data.length; i++) {
        classAc.push(data[i].class);
        classNa.push($rootScope.classHash[data[i].class]);
      }
      //sets scope data on success
      $scope.classData.classAcronyms = classAc;
      $scope.classData.classNames = classNa;
    }).error(function (data) {
      console.log('get class names error', data);
    });
  }
]);
'use strict';
/* global Firebase */
angular.module('fullsailsitinApp').controller('DateCtrl', [
  '$scope',
  '$routeParams',
  '$http',
  '$rootScope',
  '$cookies',
  'TotalSitins',
  'MenuSlider',
  function ($scope, $routeParams, $http, $rootScope, $cookies, TotalSitins, MenuSlider) {
    //menu slideout controller
    $scope.menu = MenuSlider;
    //Checks cookie to find current user cookies
    //in order to repopulate global user data
    if ($rootScope.currentUser === undefined) {
      $rootScope.currentUser = {
        'name': $cookies.name,
        'avatar': $cookies.avatar,
        'email': $cookies.email,
        'sitins': $cookies.sitins
      };
    }
    //Default hides & resets modal confirmation message on page load
    $scope.showConfirmation = true;
    $scope.cancelButton = 'Cancel';
    $scope.buttonWidth = '';
    //acronym passed through url for querying API
    var acro = $routeParams.a;
    //Variable built just to run an instance of TotalSitins.
    //TotalSitins primary funciton is to  add items to $rootScope
    var ts = TotalSitins;
    console.log(ts);
    //necessary for jshint
    //=========================================
    //GET class dates where acronyms match from API
    //=========================================
    //passing GET parameter in url as a hack. Using the data parameter
    //in $http wasn't working
    var requestUrl = 'http://127.0.0.1:8887/public/get-dates' + '?data=' + acro;
    var classDay = [];
    var classDate = [];
    var classTime = [];
    var classInst = [];
    $scope.classDates = {};
    $scope.classDates.name = acro;
    $scope.classDates.fullName = $rootScope.classHash[acro];
    $http({
      method: 'GET',
      url: requestUrl
    }).success(function (data) {
      //on success, loops through class date data, pushing into
      //an array delivery to ngRepeat.
      for (var i = 0; i < data.length; i++) {
        classDay.push(data[i].day);
        classDate.push(data[i].date);
        classTime.push(data[i].start.substr(11));
        classInst.push(data[i].instructor);
      }
      //sets scope data on success
      $scope.classDates.classDay = classDay;
      $scope.classDates.classDate = classDate;
      $scope.classDates.classTime = classTime;
      $scope.instructors = classInst;
      $scope.classDates.len = data;
    }).error(function (data, status, headers) {
      console.log('get class names error', data, status, headers);
    });
    //=========================================
    //Send notification, MODAL WINDOW handlers
    //=========================================
    $scope.confirm = function (currentIndex, name, date) {
      console.log(currentIndex, name, date);
      $scope.showModal = true;
      //Sets the current index for use in the sendNotice function below
      $scope.currentIndex = currentIndex;
      //If currentIndex == next, this means the click originated
      //from the add next class button. returnNext will query db
      //for the next class
      if (currentIndex === 'next') {
        returnNext(name, date);
      }
    };
    $scope.cancel = function () {
      $scope.showModal = false;
      //Removes confirmation message styles
      $scope.showConfirmation = true;
      //note** This boolean is backward
      $scope.cancelButton = 'Cancel';
      $scope.buttonWidth = '';
    };
    //Hit API for the instructor's name, then check name against
    //hash table, adding class, date, and time to modal.
    $scope.sendNotice = function () {
      //pulls appropriate email address form hash table
      //based on current index acronym
      var instEmail = $rootScope.emailHash[$scope.classDates.name];
      // var obj = {
      // 	'className': $scope.classDates.fullName,
      // 	'day': $scope.classDates.classDay[$scope.currentIndex],
      // 	'date': $scope.classDates.classDate[$scope.currentIndex],
      // 	'time': $scope.classDates.classTime[$scope.currentIndex],
      // 	'instructor': $scope.instructors[$scope.currentIndex],
      // 	'instEmail':instEmail,
      // 	'userEmail': $rootScope.currentUser.email,
      // 	'userName': $rootScope.currentUser.name
      // };
      var emailUrl = 'http://127.0.0.1:8887/public/send-email' + '?' + 'className=' + $scope.classDates.fullName + '&day=' + $scope.classDates.classDay[$scope.currentIndex] + '&date=' + $scope.classDates.classDate[$scope.currentIndex] + '&time=' + $scope.classDates.classTime[$scope.currentIndex] + '&instructor=' + $scope.instructors[$scope.currentIndex] + '&instEmail=' + instEmail + '&userEmail=' + $rootScope.currentUser.email + '&userName=' + $rootScope.currentUser.name;
      //Had to hack the url. POST method not working properly
      $http({
        method: 'GET',
        url: emailUrl
      }).success(function (data, status, headers) {
        console.log('email sent success', data, status, headers);
        $scope.showConfirmation = false;
        $scope.cancelButton = 'Close Window';
        $scope.buttonWidth = 'cancel-btn-wide';
        //Runs the function to add this booked class
        //to a running tally of sit ins.
        tallySitins();
      }).error(function (data, status, headers) {
        console.log('email send error', data, status, headers);
      });
    };
    //Function pushes new sitins into the user object for tallying
    //This just assumes that the student keeps their appointment.
    //V2 functionality could be a checkin system for checking in while
    //attending a sitin.
    function tallySitins() {
      // jshint ignore:line
      var fbConn = new Firebase('https://sitin.firebaseio.com/attended/');
      var obj = {
          'classDate': $scope.classDates.classDate[$scope.currentIndex],
          'class': $scope.classDates.name,
          'user': $rootScope.currentUser.name
        };
      // Builds a record of requested sitins on a unique timestamp
      //in the "attended" directory.
      fbConn.child(getTimestamp()).set(obj);
    }
    function returnNext(name, date) {
      //add class acronym to request to query on
      var rUrl = 'http://127.0.0.1:8887/public/get-dates' + '?data=' + name;
      $http({
        method: 'GET',
        url: rUrl
      }).success(function (data) {
        console.log(data, date);
      }).error(function (data, status, headers) {
        console.log('get class names error', data, status, headers);
      });
    }
    function getTimestamp() {
      var d = new Date();
      var day = d.getDay();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var ms = d.getMilliseconds();
      var time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + minutes + ':' + ms;
      return time;
    }
  }
]);
'use strict';
/* global Firebase */
angular.module('fullsailsitinApp').controller('loginCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  '$cookies',
  function ($scope, $rootScope, $window, $cookies) {
    //=========================================
    //Called by the login button on the home page
    //=========================================
    $scope.loginUser = function () {
      //Runs the angularfire login method
      //with a callback for success
      $rootScope.loginObject.$login('github').then(function (user) {
        console.log(user);
        //Controls login auth and forces route.
        //Sends user to sitin page if user has been authed by firebase
        if (user !== null) {
          $window.location.href = '#/sitin';
          //Stores basic user data into a global scope for sitewide use
          //when a user has been logged in. **Added jshint ignore to allow the _ char
          //** currentUser added to in the totalSitins function below
          $rootScope.currentUser = {
            'name': user.displayName,
            'avatar': user.avatar_url,
            'email': user.email,
            'added': getDatetime()
          };
          //Checks if user exists in Firebase. If not,
          //adds the user for tracking
          checkUser();
        }
      }, function (error) {
        console.log(error, 'user auth failed');
      });
    };
    function checkUser() {
      var fb = new Firebase('https://sitin.firebaseio.com/users/');
      var userArray = [];
      var match = true;
      //retrieves & stores all usernames from Firebase
      fb.on('child_added', function (snapshot) {
        userArray.push(snapshot.val());
      });
      //Client side query to test for existing user
      //in Firebase. If not found, throws a 'false'
      //synchronously picked up by the !match condition below
      for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].name === $rootScope.currentUser.name) {
          match = true;
        } else {
          match = false;
        }
      }
      //adds username as primary key
      //under which the user data object is placed &
      //sets a username cookie
      if (!match) {
        fb.child($rootScope.currentUser.name).set($rootScope.currentUser);
      }
      //Set the current user cookies
      setUserCookies();  //Calculates total sitins. STORES A COOKIE of the number
                         // totalSitins($rootScope.currentUser.name);
    }
    // checkUser()
    function setUserCookies() {
      $cookies.name = $rootScope.currentUser.name;
      $cookies.avatar = $rootScope.currentUser.avatar;
      $cookies.email = $rootScope.currentUser.email;
    }
    //Loops through firebase attended directory
    //searches for all entries where the user matches current user
    //stores entry in an array for use throughout the site.
    // function totalSitins(user){
    // 	var fbAtt = new Firebase('https://sitin.firebaseio.com/attended/');
    // 	var attendedArray = [];
    // 	fbAtt.on('child_added', function(snapshot){
    // 		if(snapshot.val().user === user){
    // 			attendedArray.push(snapshot.val());
    // 			//Runs up the value on the .sitins property
    // 			//probably not the most efficient way to handle this
    // 			//async callback
    // 			$rootScope.currentUser.sitins = attendedArray.length;
    // 		}
    // 	});
    // }
    function getDatetime() {
      // datetime on 12 hr clock
      var d = new Date();
      var day = d.getDay();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var time;
      if (hour >= 13) {
        hour = hour - 12;
        time = hour + ':' + minutes;
        time += 'pm';
      }
      return month + '/' + day + '/' + year + ' ' + time;
    }
  }
]);
'use strict';
angular.module('fullsailsitinApp').controller('logoutCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  '$cookies',
  function ($scope, $rootScope, $window, $cookies) {
    //Called by logout buttons in app header or menu
    $scope.logoutUser = function () {
      //Logs user out of Github,
      //erases currentUSer scope data,
      //then spits them back to login page
      $rootScope.loginObject.$logout();
      $rootScope.currentUser = '';
      removeUserCookies();
      $window.location.href = '#/';
      //**set jshint to ignore my function call before declaration
      function removeUserCookies() {
        // jshint ignore:line
        $cookies.name = '';
        $cookies.avatar = '';
        $cookies.email = '';
        $cookies.sitins = '';
      }
    };
  }
]);
'use strict';
angular.module('fullsailsitinApp').controller('MenuCtrl', [
  '$scope',
  function ($scope) {
    var toggle = false;
    $scope.menu = {};
    $scope.slideout = function () {
      if (!toggle) {
        $scope.menu.animate.fx = 'fadeInRightBig';
        $scope.menu.slideoutSwitch = true;
        toggle = true;
      } else {
        $scope.menu.animate.fx = 'fadeOutRightBig';
        setTimeout(switchFalse, 1000);
        toggle = false;
      }
    };
    function switchFalse() {
      $scope.menu.slideoutSwitch = false;
    }
  }
]);
'use strict';
/* global Firebase */
angular.module('fullsailsitinApp').factory('TotalSitins', [
  '$rootScope',
  '$cookies',
  function ($rootScope, $cookies) {
    var obj = {};
    obj.attendedArray = [];
    var fb = new Firebase('https://sitin.firebaseio.com/attended/');
    // var user = $rootScope.currentUser.name;
    var user = $cookies.name;
    fb.on('child_added', function (snapshot) {
      if (snapshot.val().user === user) {
        obj.attendedArray.push(snapshot.val());
        //Runs up the value on the .sitins property
        //probably not the most efficient way to handle this
        //async callback
        $rootScope.currentUser.sitins = obj.attendedArray.length;
        $cookies.sitins = obj.attendedArray.length;
        //**Cookie not setting????
        //Get sitin classes here
        //Renders in the header view
        $rootScope.sitins = obj.attendedArray;
      }
    });
    return obj;
  }
]);
'use strict';
angular.module('fullsailsitinApp').factory('MenuSlider', [function () {
    var toggle = false;
    var menu = {};
    menu.slideout = function () {
      if (!toggle) {
        menu.animate = 'fadeInRightBig';
        menu.slideoutSwitch = true;
        toggle = true;
      } else {
        menu.animate = 'fadeOutRightBig';
        setTimeout(switchFalse, 1000);
        toggle = false;
      }
    };
    function switchFalse() {
      menu.slideoutSwitch = false;
    }
    return menu;
  }]);
'use strict';
/*global Firebase*/
angular.module('fullsailsitinApp').factory('FireConn', [
  '$firebase',
  function ($firebase) {
    var url = 'https://sitin.firebaseio.com/attended/', instance = new Firebase(url);
    return $firebase(instance);
  }
]);