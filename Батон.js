/*
	<table>
		<thead>
			<tr>
				<td>
					<input type="text" id="menu_rot_link" placeholder="Старая ссылка на картинку">
				</td>
				<td>
					<input type="text" id="menu_rot_newLink" placeholder="Новая ссылка на картинку">
				</td>
				<td>
					<input type="button" id="menu_rot_add" value="+">
				</td>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
*/
	var check = JSON.parse(localStorage.getItem('serolapy_new_img'));
	if (!check){
		localStorage.setItem('serolapy_new_img', JSON.stringify([]));
	}

	//обновление данных таблицы
	function update(){
		var LocalS = JSON.parse(localStorage.getItem('serolapy_new_img')),
			tbody = '';
		$('#menu_rot tbody').html('');
		for(i=0; i < LocalS.length; i++){
			tbody += '<tr><td>' + LocalS[i]['old'] + '</td><td>' + LocalS[i]['new'] + '</td><td><input type="button" class="serolapy_minus" value="-" data-id="' + i + '"></td></tr>';
		}

		$('#menu_rot tbody').html(tbody);
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
		console.log('a');
	});
	update();