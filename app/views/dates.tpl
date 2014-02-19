

<div ng-include src="'views/header.tpl'"></div>





	<div ng-show="showModal" class="modal">
		<div class="mod-container">
			<h2>Notify {{instructor}}</h2>
			<p>you'd like to sit in on {{className}} {{date}} {{time}}?</p>

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