
<header class="cf">
	<h1>Full Sail Sit-In</h1>

	<nav>
		<ul>
			<li class="nav-profile"><img src="images/avatar.jpg" width="46"/>
					<span>Adam Gedney</span>
						<span class="yellow">21</span>
							<span class="small">sit-ins</span></li>
			<li><a ng-controller="logoutCtrl" ng-click="logoutUser()">Logout</a></li>

		</ul>
	</nav>

	<img ng-click="slideout()" class="cursor-true menu-btn animated {{animate.btn}}" src="images/menu.png" alt="menu button"/>
</header>

<div ng-show="slideoutSwitch" class="slideout animated {{animate.type}}">
	<ul>
		<li></li>
		<li><img src="images/avatar.jpg" width="46"/>
			<span class="super">Logged in as:</span>
				<span class="menu-item">Adam Gedney</span>
					<span class="menu-points">21</span>
						<span class="menu-points-units">sit-ins</span></li>

		<li class="attended-classes">
			<ul>
				<li class="center">Attended Classes</li>
				<li><span class="bold">{{acronym}}</span> {{date}} {{time}}
					<img src="images/add.png" alt="add next class icon" />
						<span class="attend-next">Attend Next Class?</span></li>

				<li><span class="bold">{{acronym}}</span> {{date}} {{time}}
					<img src="images/add.png" alt="add next class icon" />
						<span class="attend-next">Attend Next Class?</span></li>

				<li><span class="bold">{{acronym}}</span> {{date}} {{time}}
					<img src="images/add.png" alt="add next class icon" />
						<span class="attend-next">Attend Next Class?</span></li>

				<li><span class="bold">{{acronym}}</span> {{date}} {{time}}
					<img src="images/add.png" alt="add next class icon" />
						<span class="attend-next">Attend Next Class?</span></li>
			</ul>
		</li>
	</ul>

	<div class="logout-item" ng-controller="logoutCtrl" ng-click="logoutUser()">
		<img src="images/logout-icon.png" height="23" alt="logout button"/>
		<p>Logout</p>
	</div><!-- /. logout-item-->

</div><!-- /.slideout-->