
<header class="cf">
	<h1>Full Sail Sit-In</h1>

	<nav>
		<ul>
			<li><a href="#">Leaderboard</a></li>
			<li class="nav-profile"><img src="images/avatar.jpg" width="46"/>
					<span>Adam Gedney</span>
						<span class="yellow">21</span>
							<span class="small">sit-ins</span></li>
			<li><a href="#">Logout</a></li>

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

		<li class="leader-menu-item"><img src="images/leader-icon.png" height="23" alt="leaderboard icon"/> <span>Leaderboard</span></li>
	</ul>

	<div class="logout-item">
		<img src="images/logout-icon.png" height="23" alt="logout button"/>
		<p>Logout</p>
	</div><!-- /. logout-item-->

</div><!-- /.slideout-->