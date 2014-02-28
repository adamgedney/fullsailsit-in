

<div ng-include src="'views/header.tpl'"></div>

	<!-- modal window tmp.-->
	<div ng-show="showModal" ng-include src="'views/modal.tpl'"></div>






	<div class="content">
		<h2>These are the classes you've requested to sit in on. Keep it up! I bet you feel smarter already, don't you?</h2>

		<ul>
			<li class="list-titles">
				<span class="item-left">Class</span>
					<span class="item-center">Date</span>
						<span class="item-right">Attend Next?</span>
			</li>

			<li ng-click="getNext(item.class, item.classDate); $root.showModal = true;"  ng-repeat="item in sitins">
					<span class="item-left">{{item.class}}</span>
						<span class="item-center">{{item.classDate | formatDateString}}</span>
							<span class="item-right"><img src="images/add.png" alt="add next class icon" /></span>
			</li>
		</ul>

	</div><!-- /.content-->






<div ng-include src="'views/footer.tpl'"></div>