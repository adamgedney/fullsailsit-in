'use strict';


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
			.error(function(status, headers){
				console.log('email send error', status, headers);

				//Visible error handling to inform user their email wasn't sent
				$rootScope.showFailure = true;
			});
		};







		//Function pushes new sitins into the user object for tallying
		//This just assumes that the student keeps their appointment.
		//V2 functionality could be a checkin system for checking in while
		//attending a sitin.
		function setSitins(){// jshint ignore:line

			var sitinObj = {
				'classDate' : $rootScope.modal.start,
				'class' : $rootScope.modal.class,
				'user' : $rootScope.currentUser.name
			};


			//This is an angularfire reference to user/**/attended
			//We push the new sitin obj.
			$rootScope.sitins.$add(sitinObj);
		}







		$rootScope.getNext = function(name, date){
			console.log(name, date);

			//add class acronym to request to query on
			var rUrl = $rootScope.DIR + '/get-next' + '?class=' + name + '&date=' + date;

			$http({method:'GET', url: rUrl})
				.success( function(data){

					//sets modal windows values to reflect the next available class
					$rootScope.modal = {
						'instructor': data[0].instructor,
						'class': name,
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
