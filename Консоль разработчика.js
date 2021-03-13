/*
	ФУНКЦИИ
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