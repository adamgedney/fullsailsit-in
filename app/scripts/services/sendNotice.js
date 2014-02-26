'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('SendNotice', ['$rootScope', '$http', function ($rootScope, $http){


		$rootScope.cancel = function(){
			$rootScope.showModal = false;

			//Removes confirmation message styles
			//if they were applied
			$rootScope.showConfirmation = false;
		};




		//Hit hash table for instructor's email, then check name against
		//hash table, adding class, date, and time to modal.
		$rootScope.sendNotice = function(){

			//pulls appropriate email address form hash table
			//based on current index acronym
			var instEmail = $rootScope.emailHash[$rootScope.classDetails.name];
			//reveals successful send message in view
			$rootScope.showConfirmation = true;

			var emailUrl = $rootScope.DIR + '/send-email' + '?' +
				'className=' + $rootScope.classDetails.fullName +
				'&day=' + $rootScope.modal.day +
				'&date=' + $rootScope.modal.start +
				'&instructor=' + $rootScope.modal.instructor +
				'&instEmail=' + instEmail +
				'&userEmail=' + $rootScope.currentUser.email +
				'&userName=' + $rootScope.currentUser.name;


			//Had to hack the url. POST method not working properly
			$http({method:'GET', url: emailUrl})
			.success(function(data, status, headers){
				console.log('email sent success', data, status, headers);

				//reveals successful send message in view
				$rootScope.showConfirmation = true;

				//Runs the function to add this booked class
				//to a running tally of sit ins.
				setSitins();

			})
			.error(function(data, status, headers){
				console.log('email send error', data, status, headers);
			});
		};







		//Function pushes new sitins into the user object for tallying
		//This just assumes that the student keeps their appointment.
		//V2 functionality could be a checkin system for checking in while
		//attending a sitin.
		function setSitins(){// jshint ignore:line

			var fbConn = new Firebase('https://sitin.firebaseio.com/attended/');

			var obj = {
				'classDate' : $rootScope.modal.start,
				'class' : $rootScope.classDetails.name,
				'user' : $rootScope.currentUser.name
			};

			// Builds a record of requested sitins on a unique timestamp
			//in the "attended" directory.
			var d = new Date().getTime();
			fbConn.child(d).set(obj);
		}







		$rootScope.getNext = function(name, date){

			//add class acronym to request to query on
			var rUrl = $rootScope.DIR + '/get-next' + '?class=' + name + '&date=' + date;

			$http({method:'GET', url: rUrl})
				.success( function(data){

					//sets modal windows values to reflec the next available class
					$rootScope.modal = {
						'instructor': data[0].instructor,
						'name': name,
						'day': data[0].day,
						'start': data[0].start,
						'again': 'again'
					};

				})
				.error(function(data, status, headers){
					console.log('get class names error', data, status, headers);
				});
		};




	}]);
