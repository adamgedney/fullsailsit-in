

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
		<h2>What class would you like to sit in on, {{user}}?</h2>

		<ul>
			<li href="#/balls">
				<span class="item-left">{{acronym}}</span>
					<span class="item-center">{{className}}</span>
						<!-- <span class="item-right">{{dateTime}}</span> -->
			</li>

			<li ng-click="chooseTime()">
				<span class="item-left">{{acronym}}</span>
					<span class="item-center">{{className}}</span>
						<!-- <span class="item-right">{{dateTime}}</span> -->
			</li>

			<li ng-click="chooseTime()">
				<span class="item-left">{{acronym}}</span>
					<span class="item-center">{{className}}</span>
						<!-- <span class="item-right">{{dateTime}}</span> -->
			</li>

			<li ng-click="chooseTime()">
				<span class="item-left">{{acronym}}</span>
					<span class="item-center">{{className}}</span>
						<!-- <span class="item-right">{{dateTime}}</span> -->
			</li>

			<li ng-click="chooseTime()">
				<span class="item-left">{{acronym}}</span>
					<span class="item-center">{{className}}</span>
						<!-- <span class="item-right">{{dateTime}}</span> -->
			</li>

			<li ng-click="chooseTime()">
				<span class="item-left">{{acronym}}</span>
					<span class="item-center">{{className}}</span>
						<!-- <span class="item-right">{{dateTime}}</span> -->
			</li>


		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>