if(window.location.host != 'catwar.su'){
	//защита от CWL,
	//ибо у Арадама в CWL открывается не
	//только Вар, но и заикс,
	//и там начинается анархия
	window.stop();
}
const versionML = '0.6.2 BETA'; //версия мода
const MainMenu_version = versionML //надпись на главном экране

/*
//доп проверка на jQuery
   if (!'jQuery' in window){return}
while($('#tr_mouth').length === 0){
	setTimeout(function(){console.log('Ждём... - Serolapy');}, 1000);
}*/

/*
	СОЗДАНИЕ ТЕЛА КОНСОЛИ
*/
//стили консоли
$('head').append($('<link>').attr('href','https://cdn.jsdelivr.net/gh/Serolapy/ModLauncher/style.css').attr('rel','stylesheet'));

//гугл шрифты иконок
$('head').append($('<link>').attr('href','https://fonts.googleapis.com/icon?family=Material+Icons').attr('rel','stylesheet'));

//тело консоли ДЕБАГ
$.get('https://cdn.jsdelivr.net/gh/Serolapy/ModLauncher/body.html',function(data){
	$('body').append(data);

/* 
//ожидание прогрузки консоли
while(!$('#MLconsole').length){
	console.log('Ждём загрузки Mod Launcher...');
} */


/*
	КНОПКИ И ФУНКЦИИ КОНСОЛИ И МОДА В ЦЕЛОМ
*/

/*Активация консоли*/
$('#MLCbutton_exit').on('click',function(e){
	$('#MLconsole').toggleClass('MLconsole_active');
	$('#to_house').toggleClass('to_house_active');
	e.preventDefault();
	$(this).toggleClass('MLCbutton_exit_active');
	$('#MLconsole').removeClass('desktopMLconsole');
	$('#to_house').removeClass('to_housedesctop');
	$('#MLCbutton_exit').removeClass('MLCbutton_exitdesctop');
	$('.MLCwindow').removeClass('MLCwindowdesctop');
	$('#desktopML1').toggleClass('desktopML1_active');
});

/*Кнопка домой*/
$('#to_house').on('click', function(e){
	e.preventDefault();
	/*Очистка окна*/
	$(".MLCwindow").css("display","none");
	/*Вкл. домашнего окна*/
	$('#MainMenu').css("display","block");
});

/*нажатие на кнопку в главном меню*/
$('.menu').click(function(e){
	e.preventDefault();
	/*Очистка поля*/
	$(".MLCwindow").css("display","none");
	/* Выборка нового окна и постановка ему display:block 
	через data-id кнопки. id(окна)=data-id(кнопки)*/
	$("#"+$(this).data('id')).css('display','block');
});

/*закрытие окна модов*/
$('#cancelML').on('click',function(e){
	e.preventDefault();
	$('#MLconsole').css('display','none');
});

/*на весь экран*/
function MobileML(){
	$('#MLconsole').toggleClass('desktopMLconsole');
	$('#to_house').toggleClass('to_housedesctop');
	$('#MLCbutton_exit').toggleClass('MLCbutton_exitdesctop');
	$('.MLCwindow').toggleClass('MLCwindowdesctop');
}
$('#desktopML').on('click',MobileML);
$('#desktopML1').on('click',MobileML);

//уведомление о новой версии
if(!localStorage.getItem('versionML')){
	localStorage.setItem('versionML',versionML);
	if("Notification" in window){
		newNotificationML('Версия мода: '+versionML, false);
		}
	else{
		alert('Версия мода: '+versionML+';  уведомления недоступны')
	}
}else if(localStorage.getItem('versionML')!=versionML){			
	newNotificationML('Обновление мода. Текущая версия: '+versionML, false);
	localStorage.setItem('versionML',versionML);
}

/*версии модов на экран настройки*/
$('#versonML').html(versionML);
$('#MainMenu_version').html(MainMenu_version);


/*
	КОНСОЛЬ РАЗРАБОТЧИКА
*/
/*написание функции*/
$('#MLCsubmit_button').on('click',function(e){
	e.preventDefault();
	var script = $('<script><\/script>').html($('#MLCsubmit_text').val()),
		div = $('<div><\/div>').html($('#MLCsubmit_text').val() + '<br>');
	div.addClass("function_text_button");
	div.append(script);
	$('#MLCcommand_text').append(div);
});


/*
	УВЕДОМЛЕНИЯ
*/
/*Значок уведомлений*/
if(localStorage.getItem('MLNotifications')=='true'){
	$('#MLCnot').children().eq(0).html('notifications');
	$('#MLCnot_window_ON').children().eq(0).html('toggle_on');
	$('#MLCnot_window_ON').css("color","#00FF7F");
} else{
$('#MLCnot_window_ON').css("color","#EB8D8D");
$('#MLCnot').css({'color':'#EB8D8D','border-color':'#EB8D8D'});
$('#MLCnot').children().eq(0).html('notifications_off');
$('#MLCnot_window_ON').children().eq(0).html('toggle_off');
}

function newNotification(title = 'CatWar', text = 'Новое уведомление', site = '#', icon = 'https://catwar.su/favicon.ico',dir = 'auto'){
/*(Заголовок, текст, ссылка при клике, направление текста)*/
	var a = {
		/*Тело уведомления*/
		body:text,
		icon:icon,
		dir:dir
	};
	if(localStorage.getItem('MLNotifications')=='true'){
		/*проверка браузера*/
		if (!("Notification" in window)) {
			alert('Ваш браузер не поддерживает уведомления.');
		}
		/*если права есть*/
		else if (Notification.permission == "granted") {
			var notification = new Notification(title, a);
			notification.onclick = function(){
				window.open(site);
				notification.close();
			}
			/*добавление в списочек*/
			var d = new Date();
			$('#MLCnot_window_table tbody').append($('<tr><\/tr>').append($('<td><\/td>').html('<b>'+title+'<\/b><br>'+text),$('<td><\/td>').html(d.getHours()+':'+d.getMinutes())));
		}
		/*получаем права*/
		else if (Notification.permission != 'denied') {
			Notification.requestPermission(function (permission) {
				/* Если права успешно получены, отправляем уведомление*/
				if (permission == "granted") {
				newNotification();
				} else {
					alert('Вы запретили показывать уведомления. Включить показ всегда можно в настройках мода.');
				}
			});
		}else {/*Отклонено*/return}
	}
}

function newNotificationML(text, siteCH, site){
	if(!siteCH){
		site = '#';
	}
	newNotification('Mod Launcher | CatWar',text,site,'https://avatars0.githubusercontent.com/u/65182656');
}

/*Вкл показа уведомлений*/
$('#MLCnot_window_ON').on('click',function(e){
	e.preventDefault();
	if(localStorage.getItem('MLNotifications')=='false'){
		localStorage.setItem('MLNotifications',true);
		$('#MLCnot').children().eq(0).html('notifications');
		$('#MLCnot').css({'color':'white','border-color':'white'});
		$('#MLCnot_window_ON').children().eq(0).html('toggle_on');
		$('#MLCnot_window_ON').css('color','#00FF7F');
	}
	else{
		localStorage.setItem('MLNotifications',false);
		$('#MLCnot').children().eq(0).html('notifications_off');
		$('#MLCnot').css({'color':'#EB8D8D','border-color':'#EB8D8D'});
		$('#MLCnot_window_ON').css('color','#EB8D8D');
		$('#MLCnot_window_ON').children().eq(0).html('toggle_off');
	}
});

/*Приудительный показ*/
$('#MLCnot_window_new').on('click',function(e){
	e.preventDefault();
	var title = prompt('Введите заголовок'),
		text = prompt('Введите текст уведомления');
		newNotification(title, text);
});


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

/*имя в Локал с, автор мода, ссылка на скрипт, разрешенные сайты*/
var MODS = [];
MODS[0] =  new mod('CatWarMod','Хвойница','https://porch.website/cwmod/CatWar_Mod.user.js',[]);
MODS[1] = new mod('CW_shed','Ленивый','https://openuserjs.org/install/ReiReiRei/CW_Shed.user.js',[]);
MODS[2] = new mod('CW_WhiteSpiderweb','Ленивый','https://openuserjs.org/install/ReReRe/CW_White_Spiderweb.user.js',['https://catwar.su/cw3/']);
MODS[3] = new mod('More_Stickers_Addon', 'Серолапый', 'https://serolapy.github.io/mods/More_Stickers_Addon.js',[]);
MODS[4] = new mod('Вароредизайн', 'Хвойница', 'https://porch.website/cwmod/CatWar_Redesign.user.js', []);

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


/*
	ТЭЙБЛ КРЕАТОР+
*/
async function preview(text){
	return await $.post("https://catwar.su/preview",{text:text});
}
	
$('#TCgo1').on('click',function(){
	var result='';
	for(i=0;i<parseInt($('#TCstolb').val());i++){
		var strok='';
		for(j=0;j<parseInt($('#TCstrok').val());j++){
			strok+='<td class="TCtd"></td>';
		}
		result+='<tr>'+strok+'</tr>';
	}
	result = '<table id="TCtable1">'+result+'</table>';
	
	$('#TCstage2').html(result);
	$('.TCtd').on('click', function(){
		$(this).html(($('#TCtext').val()!=''? $('#TCtext').val():' '));
	});
	$('#TCgo2').css('display','block');
});
$('#TCgo2').on('click',async function(){
	var resultBBcode = '[table'+($('#TCcolor').val()==''?'':'='+$('#TCcolor').val())+']';
	for(tr=0;tr<$('#TCtable1').children().eq(0).children().length;tr++){
		/*для строчек*/
		resultBBcode+='[tr]';
		for(td=0;td<$('#TCtable1').children().eq(0).children().eq(tr).children().length;td++){
			/*для каждй ячейки*/
			resultBBcode+='[td]';
			/*текст ячейки*/
			resultBBcode+=$('#TCtable1').children().eq(0).children().eq(tr).children().eq(td).html();
			resultBBcode+=' [/td]';
		}
		resultBBcode+='[/tr]';
	}
	resultBBcode+='[/table]';
	
	/*вывод, чёрт возьми*/
	$('#TCstage3').html(await preview(resultBBcode));
	$('#TCpreviewText').text(resultBBcode);
});


/*
	БАТОН-АДДОН
*/
var check = JSON.parse(localStorage.getItem('serolapy_new_img'));
if (!check){
	localStorage.setItem('serolapy_new_img', JSON.stringify([]));
}

//обновление данных таблицы
function update(){
	var LocalS = JSON.parse(localStorage.getItem('serolapy_new_img')),
		tbody = '';
	$('#MLbaton_table tbody').html('');
	for(i=0; i < LocalS.length; i++){
		tbody += '<tr><td>' + LocalS[i]['old'] + '</td><td>' + LocalS[i]['new'] + '</td><td><input type="button" class="serolapy_minus" value="-" data-id="' + i + '"></td></tr>';
	}

	$('#MLbaton_table tbody').html(tbody);
	removeLink();

	//замена значний на поле
	for(j=0; j<LocalS.length; j++){
		var re = LocalS[j]['old'];
		for (k=0; k < $('img[src="'+re+'"]').length;k++){
			$('img[src="'+re+'"]:eq('+k+')').attr('src', LocalS[j]['new']);
		}
	}
}

//сохранение данных
$('#menu_rot_add').on('click',function(){
	if($('#menu_rot_link').val()=='' || $('#menu_rot_newLink').val()==''){
		return
	}

	var LocalS = JSON.parse(localStorage.getItem('serolapy_new_img'));

	LocalS.push({'old' : $('#menu_rot_link').val(), 'new' : $('#menu_rot_newLink').val()});
	$('#menu_rot_link').val('');
	$('#menu_rot_newLink').val('');

	localStorage.setItem('serolapy_new_img', JSON.stringify(LocalS));

	update();
	removeLink();
});

//удаление
function removeLink(){
	var btn = $('.serolapy_minus');
	btn.off('click');
	btn.on('click',function(){
		var LocalS = JSON.parse(localStorage.getItem('serolapy_new_img'));
		LocalS.splice($(this).data('id'),1);
		localStorage.setItem('serolapy_new_img', JSON.stringify(LocalS));
		update();
	});
}
$("#tr_mouth, #tr_field").bind("DOMSubtreeModified", function() {
	update();
});
update();

//мяу
});