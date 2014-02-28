

<div ng-include src="'views/header.tpl'"></div>


	<!-- modal window tmp.-->
	<div ng-include src="'views/modal.tpl'"></div>







	<div class="content">
		<h2>Select a date & time to sit in on <span class="red">{{classDetails.fullName}}</span>.</h2>

		<ul>
			<li class="list-titles">
				<span class="item-left">Day</span>
					<span class="item-center">Date</span>
						<span class="item-right">Room #</span>
			</li>

			<li class="class-dates" ng-click="$root.modal = item; $root.showModal = true;" ng-repeat="item in classDetails">
					<span class="item-left">{{item.day}}</span>
						<span class="item-center">{{item.start | formatDateString}}</span>
							<span class="item-right">{{item.room}}</span>
			</li>
		</ul>

	</div><!-- /.content-->





<div ng-include src="'views/footer.tpl'"></div>