// создаем костанты для работы с текстом
const dataURL = "https://api.myjson.com/bins/jcmhn";
// создаем переменную со всеми VAR которые надо поменять
const fields = [
	"var1",
	"var2",
	"var3",
	"var4",
	"var5",
	"var6",
	"speach",
]
// создаем текст который будет вылазить в <p> в зависимости какая это страница (данную штуку лучше делать в CSS)
let message1 = "Вписывай варианты ответа в строки, жми <span>Показать сказку</span> и смотри результат";
let message2 = "Редактировать сказку- нажми <span>Сделать замену</span></p>"

/* 5) запускаем getFormsValues */
function getFormsValues() {
	let obj = {};// создаем пустой массив obj
	fields.forEach(function(item, index) {
		obj[item] = $("input[name=" + item + "]").val()
		});
		return obj;
};

/* 4) запускаем handleData и выводим информацию*/
function handleData(data) {
	let finalMessage = ""; 
	let obj = getFormsValues(); 

	data["text"].forEach(function(item, index) { 
	for (key in obj) { 
		item = item.replace("{"+ key +"}", obj[key]);
	}
		finalMessage = finalMessage + item + "<br>";
	});
		$(".result").html(finalMessage);
}

/* 3) запускаме функцию и считываем инфу с URL, года считывыание успешно выполняем handleData*/
function handleButton() {
	$.getJSON({
		url: dataURL,
		textType: "JSON",
		success: handleData
	});
	// после выполнения handleData:
	$("form").hide();// скрываем все что находиться в form
	$(".first-button").hide();// скрываем кнопку с классом first-button
	$(".secondary-button").show();// показываем кнопку с классом secondary - button
	$("p").html(message2);// Меняем текст в <p>
	$(".secondary-button").click(showForm);// при нажатии на кнопу отправляемся на showForm
	
}
// после нажатия на кнопку Сделать замену:
function showForm() {
	$("form").show();// Показываем form
	$(".first-button").show();
	$(".secondary-button").hide();
	$("p").html(message1);


}
/* 2) ждем нажатия кнопки с id #button-fetch и отпраялем на запуск фуекцции handleButton*/
function init() {
	$("p").html(message1); // выводим сообщение message1 в <p>
	$("#button-fetch").click(handleButton)
}

/* 1) ждем полной загрузки страницы и оьправляем на функцию init*/
$(document).ready(init);











/*function handleData(data) {*/
  // кажется, какой-то из этих способов сработает
  //const var1 = $("input[name=var1]")[0].value()
  //const var1 = $("input[name=var1]").value()
  //const var1 = $("input[name=var1]")[0].default()

  // надо сделать так чтобы сообщения подменились на значения из формы
/*  let text = "Здесь могла быть ваша реклама";
	$("#result").text(text);
}*/