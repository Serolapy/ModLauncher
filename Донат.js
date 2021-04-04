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