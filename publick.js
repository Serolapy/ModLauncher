if(window.location.host != 'catwar.su'){
	//защита от CWL,
	//ибо у Арадама в CWL открывается не
	//только Вар, но и заикс,
	//и там начинается анархия
	window.stop();
}
const versionML = '1.0'; 				//версия мода
const MainMenu_version = versionML;		//надпись на главном экране
const BRANCH = 'master';				//ветка на GitHub | 'Test' - для тестов, 'master' - для релизов

/*
	СОЗДАНИЕ ТЕЛА КОНСОЛИ
*/
//стили консоли
$.get('https://raw.githubusercontent.com/Serolapy/ModLauncher/' + BRANCH + '/style.css', function(styles){
	$('head').append($('<style></style>').text(styles));
})

//гугл шрифты иконок
$('head').append($('<link>').attr('href','https://fonts.googleapis.com/icon?family=Material+Icons').attr('rel','stylesheet'));

//тело консоли
$.get('https://raw.githubusercontent.com/Serolapy/ModLauncher/' + BRANCH+ '/body.html',function(data){
	$('body').append(data);

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
	
	//код
	var code = $('#MLCsubmit_text').val();
	
	//вставка его на страницу в поле с кодом игрока
	$('#MLCcommand_text').append($('<div></div').text(code).addClass('MLcode_user_function').addClass('MLcode_user_function_text'));
	
	try{
		//генерация функции игрока
		new Function(code)();
	} catch(userError){
		//в случае ошибки
		$('#MLCcommand_text').append($('<div></div>').html('<b>' + userError.name + '</b><br><i>' + userError.message + '</i>').addClass('MLcode_user_function').addClass('MLcode_user_function_error'));
	}
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
MODS[0] = new mod('CatWarMod','Хвойница','https://porch.website/cwmod/CatWar_Mod.user.js',[]);
MODS[1] = new mod('CW_shed','Ленивый','https://openuserjs.org/install/ReiReiRei/CW_Shed.user.js',[]);
MODS[2] = new mod('CW_WhiteSpiderweb','strongfish95','https://openuserjs.org/install/ReReRe/CW_White_Spiderweb.user.js',['https://catwar.su/cw3/']);
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

/*
	ПОЖЕРТВОВАНИЯ
*/
$('#MLCdonate_button').on('click', function(){
	var value = Math.floor($('#MLCdonate_value').val());
	if (value <= 0){
		alert('Ошибка. Число не может быть меньше либо равно нулю');
		return
	}
	if(confirm('Вы действительно хотите это сделать?\n__________\nВ случае чего Mod Launcher не может отловить ошибки, смотрите лог')){
		$.post('https://catwar.su/rabbit', {rabbit : value, cat : 982738, comment : 'Помощь голодающим программистам от добрых котиков'});
		alert(' o(>ω<)o Спасибо!:3');
	}
});

/*
	СООБЩЕНИЯ
*/
/*
function getUpdateMessage(){
	var folder = $('#MLmessage_folder').val() || 0,	//номер папки
		page = $('#MLmessage_page').val();			//страница
	
	//смена слова "Кому" и "От кого"
	if(folder == 0 || folder == 2){
		$('#MLmessage_poluch').text('От кого');
	} else{
		$('#MLmessage_poluch').text('Кому');
	}
	
	$.post('https://catwar.su/ajax/mess_folder', {folder: folder, page: page, del:0}, function(data){
		try{
			data = JSON.parse(data);
		} catch{
			alert('Ошибка приёма данных сообщений');
			return
		}
		
		//количество сообщений в папке
		$('#MLmessage_messageInFolder').text(data.count[folder]);
		
		//количество страниц
		var pageHtml = '';
		for(i=1; i<=data.page; i++){
			pageHtml += '<option value="' + i + '"' + (i==1 ? 'selected':'') + '>' + i + '</option>';
		}
		$('#MLmessage_page').html(pageHtml);
		
		//поле с сообщениями
		var messages = data.msg,
			messagesHtml = '';
		for(j=0;j<messages.length;j++){
			var msg = messages[j];
			//тема + ссылка на открытие
			messagesHtml += '<tr' (msg['new'] == 0? ' class="MLmessage_notRead"' : '') + '><td><a href="#" data-id="' + msg.id + '" class="MLmessage_msg_subject">' + msg.subject + '</a></td>';
			//оправитель/получаетль
			messagesHtml += '<td class="MLmessage_msg_login">' + msg.login + '</td>';
			//время
			var heute = new Date(),
				timeMsg = new Date(msg.time),
				returnTime = '';
			if(heute.getDate() == timeMsg.timeMsg() && heute.getMonth() == timeMsg.getMonth() && heute.getFullYear() == timeMsg.getFullYear()){
				//сегодняшнее сообщение
				returnTime = timeMsg.getHours() + ':' + timeMsg.getMinutes();
			} else{
				//иначе
				returnTime = timeMsg.getDate() + '.' + (timeMsg.getMonth() + 1);
			}
			messagesHtml += '<td class="MLmessage_msg_time">' + returnTime + '</td></tr>';
		}
		$('#MLmessage_table tbody').html(messagesHtml);
		
		//поиск непрочитанных
		if(localStorage.getItem('MLmessage_new_test') === null){
			localStorage.setItem('MLmessage_new_test', 0);
		}
		var LocStor = parseInt(localStorage.getItem('MLmessage_new_test'));
		if(LocStor < data.count['notRead']){
			//есть непрочитанные
			$('#MLmessageBtn').css({'color':'#EB8D8D','border-color':'#EB8D8D'});
			$('#MLCbutton_exit').addClass('MLCbutton_exit_newMessage');
		}
		localStorage.setItem('MLmessage_new_test', data.count['notRead'])
	});
}
$('#MLmessage_folder, #MLmessage_page').change(getUpdateMessage);
var messageInterval = setInterval(getUpdateMessage, 30000);

//отключение
$('#MLmessage_off').on('click', function(){
		if(confirm('Вы действительно хотите отключить получение сообщений на этой странице?')){
			clearInterval(messageInterval);
		}
});

//отметка о том, что игрок заметил новое сообщение
$('#MLmessage').on('click', function(){
	$('#MLmessageBtn').css({'color':'white','border-color':'white'});
	$('#MLCbutton_exit').removeClass('MLCbutton_exit_newMessage');
});
*/

//мяу
});