'use strict';

/* global Firebase */
angular.module('fullsailsitinApp')
	.factory('SendNotice', ['$rootScope', '$http', function ($rootScope, $http){



		$rootScope.confirm = function(currentIndex, name, date){

			//Sets the current index for use in the sendNotice function below
			$rootScope.currentIndex = currentIndex;
			$rootScope.showConfirmation = false;
			$rootScope.showModal = true;

			//If currentIndex == next, this means the click originated
			//from the add next class button. getNext will query db
			//for the next class
			if(currentIndex === 'next'){

				getNext(name, date);


			}else{

				$rootScope.modal = {
					'instructor': $rootScope.classDetails[currentIndex].instructor,
					'name': $rootScope.classDetails.name,
					'day': $rootScope.classDetails[currentIndex].day,
					'start': $rootScope.classDetails[currentIndex].start,
					'again': ''
				};

			}
		};




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
			var instEmail = $rootScope.emailHash[$rootScope.modal.name];
			//reveals successful send message in view
			$rootScope.showConfirmation = true;

			var emailUrl = 'http://127.0.0.1:8887/public/send-email' + '?' +
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
				'class' : $rootScope.modal.name,
				'user' : $rootScope.currentUser.name
			};

			// Builds a record of requested sitins on a unique timestamp
			//in the "attended" directory.
			var d = new Date().getTime();
			fbConn.child(d).set(obj);
		}







		function getNext(name, date){

			//add class acronym to request to query on
			var rUrl = 'http://127.0.0.1:8887/public/get-next' + '?class=' + name + '&date=' + date;

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
		}




	}]);
