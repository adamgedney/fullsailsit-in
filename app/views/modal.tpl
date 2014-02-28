
	<div ng-show="showModal" class="modal">
		<div class="mod-container">
			<h2 ng-show="!showConfirmation" >Notify <span class="red">{{modal.instructor}}</span></h2>
			<p ng-show="!showConfirmation">you'd like to sit in on {{modal.class}} {{modal.again}} <br /> {{modal.day}} {{modal.start | formatDateString}}?</p>

			<p ng-show="showConfirmation">Your notification sent successfully. Please allow a day or so for your instructor to reply.</p>

			<img ng-show="showConfirmation" src="images/check.png" alt="check image"/>

			<button ng-show="!showConfirmation" ng-click="cancel()" class="btn cancel-btn">Cancel</button>
			<button ng-show="showConfirmation" ng-click="cancel()" class="btn cancel-btn cancel-btn-wide">Close Window</button>

			<button ng-show="!showConfirmation" ng-click="sendNotice()" class="btn request-btn">Send Request</button>

		</div><!-- /.mod-container-->
	</div><!-- /.modal-->
