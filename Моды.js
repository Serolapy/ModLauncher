/*
	МОДЫ
*/
/*
MODS - Массив с модами;

Свойства объектов модов:
.name - имя мода;
.check - состояние мода (true/false);
.author - аффтор мода;
.link - ссылка на внешний скрипт с модом;
.site - сайты, где работает мод;
*/

//проверка на наличие в Local Srtorage значений
try{
	if(!JSON.parse(localStorage.getItem('MLMods'))){
		localStorage.setItem('MLMods', JSON.stringify({}));
	}
}
catch(e){
	if (e instanceof SyntaxError){
		localStorage.setItem('MLMods', JSON.stringify({}));
	}
}

var MODS = [];
MODS[0] =  new mod('CatWarMod','Хвойница','https://openuserjs.org/install/Fredo14/CatWar_Mod.user.js',[]);
MODS[1]  = new mod('CW_shed','Ленивый','https://openuserjs.org/install/ReiReiRei/CW_Shed.user.js',[]);
MODS[2] = new mod('CW_WhiteSpiderweb','Ленивый','https://openuserjs.org/install/ReReRe/CW_White_Spiderweb.user.js',['https://catwar.su/cw3/']);
MODS[3]  = new mod('More_Stickers_Addon', 'Серолапый', 'https://serolapy.github.io/mods/More_Stickers_Addon.js',[]);

/*Создание списка модов*/
for(i=0;i<MODS.length;i++){
	var tr = $('<tr><\/tr'),
	td1 = $('<td><\/td'),
	td2 = $('<td><\/td'),
	a='';
	td1.append(MODS[i].name + '<br><b>Автор: </b>' + MODS[i].author);
	if(MODS[i].check){a='toggle_on';}
	else{a='toggle_off';};
	var b = $('<a><\/a>').attr('href','#').attr('id','a_'+MODS[i].name).html("<span class='material-icons'>"+a+"<\/span>").addClass("MLCmods_window_table_button_class").attr("data-id",MODS[i].name).css('color','#EB8D8D');
	if(MODS[i].check){b.css('color','#00FF7F');}
	td2.append(b);
	tr.append(td1,td2);
	$("#MLCmods_window_table tbody").append(tr);
}

/*Вкл/откл модов*/
$(".MLCmods_window_table_button_class").on('click',function(e){
	e.preventDefault();
	
	var MOD = $(this).attr("data-id"),
		LS = JSON.parse(localStorage.getItem('MLMods'));
	if(LS[MOD]){
		LS[MOD] = false;
		localStorage.setItem('MLMods',JSON.stringify(LS));
		$('#a_'+MOD).children().eq(0).html('toggle_off');
		$('#a_'+MOD).css('color','#EB8D8D');
	}else{
		LS[MOD] = true;
		localStorage.setItem('MLMods',JSON.stringify(LS));
		$('#a_'+MOD).children().eq(0).html('toggle_on');
		$('#a_'+MOD).css('color','#00FF7F');
	}
});

//функция для созданий модов
function mod(check,author,link,site /*имя в Локал с, автор мода, ссылка на скрипт, разрешенные сайты*/){
	/*проверка на разрешение сайта разработчиком мода*/
	var siteCheck = false;
	for(i=0;i<site.length;i++){
		if(window.location.href==site[i]){
			siteCheck=true
	}}
	if(site.length==0 || siteCheck){
		var LS = JSON.parse(localStorage.getItem('MLMods')),
			checkMod = LS[check];
		if(checkMod == undefined){
			/*дефолтные значения*/
			LS[check] = false;
			localStorage.setItem('MLMods',JSON.stringify(LS));
		}
		if(checkMod){
			/*если мод разрешён*/
			let script = document.createElement("script");
			script.src = link;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	}
	this.check = JSON.parse(localStorage.getItem('MLMods'))[check];
	this.author = author;
	this.link = link;
	this.site = site;
	this.name = check;
}
