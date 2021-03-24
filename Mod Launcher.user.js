/*	****     **** ********* *****	  ***	   ******  ***   *** ****   ** ******* ***   *** 
	*****   ***** *********	*******	  ***	  ***  *** ***	 *** *****  ** ******* ***   ***
	****** ****** ***	*** ***  ***  *** 	  ***  *** ***   *** ** *** ** ***	   *********
	*** ***** *** ********* *******	  ******* ******** **** **** **  ***** ******* ***   *** **
	***  ***  *** ********* ******	  ******* ***  ***  *******  **   **** ******* ***   *** **
*/
// ==UserScript==
// @name         Mod Launcher
// @namespace    https://catwar.su/cat982738
// @version      ~default~
// @description  Упрощённое управление модами для CatWar
// @copyright	 2020 - 2021, Serolapy
// @license		 MIT
// @author       Серолапый [cat982738]
// @include      https://catwar.su/*
// ==/UserScript==

while(!("jQuery" in window)){
	setTimeout(function(){return}, 1000);
}
var ModLauncher = document.createElement("script");
ModLauncher.src = "https://cdn.jsdelivr.net/gh/Serolapy/ModLauncher/publick.js";
document.getElementsByTagName("head")[0].appendChild(ModLauncher);