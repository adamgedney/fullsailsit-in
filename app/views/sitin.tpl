

<div ng-include src="'views/header.tpl'"></div>

	<div class="content">
		<h2>What class would you like to sit in on, {{currentUser.name}}?</h2>

		<ul>
			<li ng-repeat="(class, $index) in classData.classAcronyms">
				<a href="#/dates">
					<span class="item-left">{{classData.classAcronyms[$index]}}</span>
						<span class="item-center">{{classData.classNames[$index]}}</span>
							<!-- <span class="item-right">{{dateTime}}</span> -->
				</a>
			</li>
		</ul>

	</div><!-- /.content-->


<div ng-include src="'views/footer.tpl'"></div>