

<div ng-include src="'views/header.tpl'"></div>





	<div ng-show="showModal" class="modal">
		<div class="mod-container">
			<h2 ng-show="showConfirmation" >Notify {{instructors[currentIndex]}}</h2>
			<p ng-show="showConfirmation">you'd like to sit in on {{classDates.name}} on {{classDates.classDay[currentIndex]}} {{classDates.classDate[currentIndex]}} at {{classDates.classTime[currentIndex]}}?</p>

			<p ng-show="!showConfirmation">Your notification sent successfully. Please allowed a day or so for your instructor to reply.</p>

			<img ng-show="!showConfirmation" src="images/check.png" alt="check image"/>

			<button ng-click="cancel()" class="btn cancel-btn {{buttonWidth}}">{{cancelButton}}</button>
			<button ng-show="showConfirmation" ng-click="sendNotice()" class="btn request-btn">Send Request</button>

		</div><!-- /.mod-container-->
	</div><!-- /.modal-->





	<div class="content">
		<h2>Select a date & time to sit in on <span class="red">{{className}}</span> {{classDates.fullName}}.</h2>

		<ul>
			<li class="class-dates" ng-click="confirm($index)" ng-repeat="(item, $index) in classDates.len">
					<span class="item-left">{{classDates.classDay[$index]}}</span>
						<span class="item-center">{{classDates.classDate[$index]}}</span>
							<span class="item-right">{{classDates.classTime[$index]}}</span>
			</li>
		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>