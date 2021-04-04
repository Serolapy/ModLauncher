/*
	ФУНКЦИИ
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