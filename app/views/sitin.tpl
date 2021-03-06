

<div ng-include src="'views/header.tpl'"></div>

	<!-- modal window tmp.-->
	<div ng-show="showModal" ng-include src="'views/modal.tpl'"></div>

	<div class="content">
		<h2>What class would you like to sit in on, {{currentUser.name}}?</h2>

		<ul>
			<li class="list-titles">
				<span class="item-left">ID</span>
					<span class="item-center">Class Name</span>
			</li>

			<li ng-repeat="(class, $index) in classData.classAcronyms">
				<a ng-href="#/dates/{{classData.classAcronyms[$index]}}" >
					<span class="item-left">{{classData.classAcronyms[$index]}}</span>
						<span class="item-center">{{classData.classNames[$index]}}</span>
				</a>
			</li>
		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>