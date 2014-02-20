
<header class="cf">
	<h1><a href="#/sitin">Full Sail Sit-In</a></h1>

	<nav>
		<ul>
			<li>Your Sitins</li>

			<li class="nav-profile"><img ng-src="{{currentUser.avatar}}" width="46"/>
					<span>{{currentUser.name}}</span>
						<span class="yellow">{{currentUser.sitins}}</span>
							<span class="small">sit-ins</span></li>
			<li><a ng-controller="logoutCtrl" ng-click="logoutUser()">Logout</a></li>

		</ul>
	</nav>

	<img ng-click="slideout()" class="cursor-true menu-btn animated" src="images/menu.png" alt="menu button"/>
</header>




<div ng-show="menu.slideoutSwitch" class="slideout animated {{menu.animate}}">
	<ul>
		<li></li>
		<li><img ng-src="{{currentUser.avatar}}" width="46"/>
			<span class="super">Logged in as:</span>
				<span class="menu-item">{{currentUser.name}}</span>
					<span class="menu-points">{{currentUser.sitins}}</span>
						<span class="menu-points-units">sit-ins</span></li>

		<li class="attended-classes">
			<ul>
				<li class="center">Your Sitins</li>

				<li ng-repeat="item in sitins"><span class="bold">{{item.class}}</span> {{item.classDate}}
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