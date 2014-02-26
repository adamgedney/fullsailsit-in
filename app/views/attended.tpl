

<div ng-include src="'views/header.tpl'"></div>





	<div ng-show="showModal" class="modal">
		<div class="mod-container">
			<h2 ng-show="!showConfirmation" >Notify <span class="red">{{modal.instructor}}</span></h2>
			<p ng-show="!showConfirmation">you'd like to sit in on {{modal.name}} {{modal.again}} <br /> {{modal.day}} {{modal.start}}?</p>

			<p ng-show="showConfirmation">Your notification sent successfully. Please allow a day or so for your instructor to reply.</p>

			<img ng-show="showConfirmation" src="images/check.png" alt="check image"/>

			<button ng-show="!showConfirmation" ng-click="cancel()" class="btn cancel-btn">Cancel</button>
			<button ng-show="showConfirmation" ng-click="cancel()" class="btn cancel-btn cancel-btn-wide">Close Window</button>

			<button ng-show="!showConfirmation" ng-click="sendNotice()" class="btn request-btn">Send Request</button>

		</div><!-- /.mod-container-->
	</div><!-- /.modal-->




	<div class="content">
		<h2>These are the classes you've requested to sit in on. Keep it up! I bet you feel smarter already, don't you?</h2>

		<ul>
			<li class="list-titles">
				<span class="item-left">Class</span>
					<span class="item-center">Date</span>
						<span class="item-right">Attend Next Class?</span>
			</li>

			<li ng-click="getNext(item.class, item.classDate); $root.showModal = true;"  ng-repeat="item in sitins">
					<span class="item-left">{{item.class}}</span>
						<span class="item-center">{{item.classDate}}</span>
							<span class="item-right"><img src="images/add.png" alt="add next class icon" /></span>
			</li>
		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>