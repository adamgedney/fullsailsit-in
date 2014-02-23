

<div ng-include src="'views/header.tpl'"></div>





	<div ng-show="showModal" class="modal">
		<div class="mod-container">
			<h2 ng-show="showConfirmation" >Notify {{classDetails[currentIndex].instructor}}</h2>
			<p ng-show="showConfirmation">you'd like to sit in on {{classDetails.name}} on {{classDetails[currentIndex].day}} {{classDetails[currentIndex].start}}?</p>

			<p ng-show="!showConfirmation">Your notification sent successfully. Please allow a day or so for your instructor to reply.</p>

			<img ng-show="!showConfirmation" src="images/check.png" alt="check image"/>

			<button ng-click="cancel()" class="btn cancel-btn {{buttonWidth}}">{{cancelButton}}</button>
			<button ng-show="showConfirmation" ng-click="sendNotice()" class="btn request-btn">Send Request</button>

		</div><!-- /.mod-container-->
	</div><!-- /.modal-->





	<div class="content">
		<h2>Select a date & time to sit in on <span class="red">{{classDetails.fullName}}</span>.</h2>

		<ul>
			<li class="class-dates" ng-click="confirm($index, classDetails.fullName, classDetails[$index].start)" ng-repeat="(item, $index) in classDetails">
					<span class="item-left">{{classDetails[$index].day}}</span>
						<span class="item-center">{{classDetails[$index].start}}</span>
							<span class="item-right">{{classDetails[$index].room}}</span>
			</li>
		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>