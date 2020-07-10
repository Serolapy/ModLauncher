var MoreStickers = new mod('More_Stickers', 'Серолапый', 'https://serolapy.github.io/');

function mod(check,author,link /*имя в Локал с, автор мода, ссылка на скрипт*/){
	var checkMod = localStorage.setItem[check];
	if(checkMod==null){
		//дефолтные значения
		checkMod = true;
		localStorage.setItem[check] = true;
	}
	this.check = checkMod;
	this.author = author;
	this.link = link;
	
	if(checkMod){
		//если мод разрешён
		let script = document.createElement("script");
		script.src = link;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
}
window.onload = function(){
	//сайт с настройками мода
	if(window.location.href=="https://catwar.su/ModLauncher"){
		var head, body;
		document.getElementsByTagName("title")[0].innerHTML = "Настройки ModLauncher";
		var css = document.createElement("style")
		css.innerHTML =``;
		
		document.getElementsByTagName("head")[0].appendChild(css);
}}