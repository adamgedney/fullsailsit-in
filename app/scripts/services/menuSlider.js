'use strict';


angular.module('fullsailsitinApp')
	.factory('MenuSlider', [ function (){

		var toggle = false;
		var menu = {};

		menu.slideout = function(){

			if(!toggle){
				menu.animate = 'fadeInRightBig';
				menu.slideoutSwitch = true;

		    toggle = true;


			}else{
				menu.animate = 'fadeOutRightBig';
				setTimeout(switchFalse, 1000);

		    toggle = false;

			}


		};


		function switchFalse(){
			menu.slideoutSwitch = false;
		}


		return menu;
	}]);
