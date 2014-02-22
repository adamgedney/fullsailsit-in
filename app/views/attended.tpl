

<div ng-include src="'views/header.tpl'"></div>





	<div ng-show="showModal" class="modal">
		<div class="mod-container">
			<h2 ng-show="showConfirmation" >Notify {{instructors[currentIndex]}}</h2>
			<p ng-show="showConfirmation">you'd like to sit in on {{classDates.name}} on {{classDates.classDay[currentIndex]}} {{classDates.classDate[currentIndex]}} at {{classDates.classTime[currentIndex]}}?</p>

			<p ng-show="!showConfirmation">Your notification sent successfully. Please allow a day or so for your instructor to reply.</p>

			<img ng-show="!showConfirmation" src="images/check.png" alt="check image"/>

			<button ng-click="cancel()" class="btn cancel-btn {{buttonWidth}}">{{cancelButton}}</button>
			<button ng-show="showConfirmation" ng-click="sendNotice()" class="btn request-btn">Send Request</button>

		</div><!-- /.mod-container-->
	</div><!-- /.modal-->




	<div class="content">
		<h2>These are the classes you've requested to sit in on. Keep it up! I bet you feel smarter already, don't you?</h2>

		<ul>
			<li class="class-dates" ng-repeat="(item, $index) in sitins">
					<span class="item-left">{{item.class}}</span>
						<span class="item-center">{{item.classDate}}</span>
							<span ng-click="confirm($index, {{item.class}}, {{item.date}})" class="item-right"><img src="images/add.png" alt="add next class icon" />
						<span class="small">Attend Next Class?</span></span>
			</li>
		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>