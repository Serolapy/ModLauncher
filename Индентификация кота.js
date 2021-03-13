/*
	обновление и добавление данных о персонаже
*/
async function MyCharacterNew(){
    var name = '';
	/*установка имени кота*/
	if(window.location.href=='https://catwar.su/'){
		name = $('#education').data('login');
	}else{
		name = prompt("Введите имя персонажа");
		if(name == null){return}
	}
	/*установка ID перса; о-очень честно стырено у @ara2am*/
	var	id = parseInt(await $.post("https://catwar.su/ajax/top_cat", {name: nameCatML}).promise()),
	/*промежуточный объект и заполнение в память*/
		a = {
			login: name,
			id: id
		};
	localStorage.setItem ("myCatML", JSON.stringify(a));
}

/*если нет данных*/
if(!localStorage.getItem('myCatML')){
	MyCharacterNew();
}

/*общедоступные переменные*/
var MY_CAT_ML = JSON.parse(localStorage.getItem('myCatML'));
/* 	MY_CAT_ML.login - имя
	MY_CAT_ML.id - ID 
*/

/*поиск аватара*/
var eml='';
function avatarML(id,a){
	switch (a){
		case ".jpg":
			eml = ".png";
			break;
		case ".png":
			eml = ".gif";
			break;
		case ".gif":
			eml = ".ERROR";
			break;
		case ".ERROR":
			eml = "";
	}
	if(eml){
		$('#avatarcatml').attr('src','https://e.catwar.su/avatar/'+id+a);
	}else{
		$('#avatarcatml').attr('src','https://serolapy.github.io/mods/img/symbol.png');
	}
}
/*установка данных в консоле на странице кота*/
avatarML(MY_CAT_ML.id,'.jpg');
$('#namecatml').html(MY_CAT_ML.login);
$('#idcatml').html(MY_CAT_ML.id);