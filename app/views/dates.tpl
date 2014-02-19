

<div ng-include src="'views/header.tpl'"></div>





	<div ng-show="showModal" class="modal">
		<div class="mod-container">
			<h2>Send a sit-in request to:</h2>
			<p>instructor@fullsail.com <br />
			to sit in on WDD 2/23/14 4:15am</p>

			<button class="btn cancel-btn">Cancel</button>
			<button class="btn request-btn">Send Request</button>

		</div><!-- /.mod-container-->
	</div><!-- /.modal-->





	<div class="content">
		<h2>Select a date & time to sit in on <span class="red">{{className}}</span> this {{currentMonth}}.</h2>

		<ul>
			<li class="class-dates" ng-click="confirm()">
					<span class="item-left">{{date}}</span>
						<span class="item-right">{{time}}</span>
			</li>

			<li class="class-dates" ng-click="confirm()">
					<span class="item-left">{{date}}</span>
						<span class="item-right">{{time}}</span>
			</li>

			<li class="class-dates" ng-click="confirm()">
					<span class="item-left">{{date}}</span>
						<span class="item-right">{{time}}</span>
			</li>

			<li class="class-dates" ng-click="confirm()">
					<span class="item-left">{{date}}</span>
						<span class="item-right">{{time}}</span>
			</li>

			<li class="class-dates" ng-click="confirm()">
					<span class="item-left">{{date}}</span>
						<span class="item-right">{{time}}</span>
			</li>



		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>