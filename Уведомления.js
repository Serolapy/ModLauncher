/*
	УВЕДОМЛЕНИЯ
*/
/*Значок уведомлений - главная*/
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