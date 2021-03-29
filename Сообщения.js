/*
<table id="MLmessage_table">
	<thead>
		<tr>
			<td>
				<select id="MLmessage_folder">
					<!--0 - входящие, 1 - исходящие, 2 - непрочитанные-->
					<option value="0" selected>Входящие</option>
					<option value="1" selected>Исходящие</option>
					<option value="2" selected>Непрочитанные</option>
				</select>
			</td>
			<td>
				<select id="MLmessage_page">
					<option value="1" selected>1</option>
				</select>
			</td>
			<td>(<span id="MLmessage_messageInFolder">~</span>}</td>
		</tr>
		<tr>
			<td>Тема</td>
			<td id="MLmessage_poluch">Кому</td>
			<td>Время</td>
		</tr>
	</thead>
	<tbody></tbody>
	<tfoot>
		<tr>
			<td colspan="3"><input type="button" id="MLmessage_off" value="Остановить"></td>
		</tr>
	</tfoot>
</table>
*/
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
				returnTime = timeMsg.getHours() + ':' timeMsg.getMinutes();
			} else{
				//иначе
				returnTime = timeMsg.getDate() + '.' (timeMsg.getMonth() + 1);
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
			$('#MLmessage').css({'color':'#EB8D8D','border-color':'#EB8D8D'});
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
	$('#MLmessage').css({'color':'white','border-color':'white'});
	$('#MLCbutton_exit').removeClass('MLCbutton_exit_newMessage');
}