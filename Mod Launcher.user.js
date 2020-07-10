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
// @copyright	 2020, Serolapy
// @license		 MIT
// @author       Серолапый, 2020
// @include      https://catwar.su/*
// ==/UserScript==
var ModLauncher = document.createElement("script");
ModLauncher.src = "https://serolapy.github.io/mods/Mod_Launcher.js";
document.getElementsByTagName("head")[0].appendChild(ModLauncher);