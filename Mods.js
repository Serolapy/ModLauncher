var MoreStickers = new mod('More_Stickers', 'Серолапый', 'https://serolapy.github.io/',[]);

var MODS = [MoreStickers];

function mod(check,author,link,site /*имя в Локал с, автор мода, ссылка на скрипт, разрешенные сайты*/){
	//проверка на разрешение сайта разработчиком мода
	var siteCheck = false;
	for(i=0;i<site.length;i++){
		if(window.location.href==site[i]){
			siteCheck=true
	}}
	if(site.length==0 || siteCheck){
		var checkMod = localStorage.getItem[check];
		if(checkMod==null){
			//дефолтные значения
			checkMod = true;
			localStorage.setItem[check] = true;
		}
		this.name = check;
		this.check = checkMod;
		this.author = author;
		this.link = link;
		this.site = site;
		
		if(checkMod){
			//если мод разрешён
			let script = document.createElement("script");
			script.src = link;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
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
