//фильтрует массив (Оставляет только те варианты, где тип данных и данные сходятся) 	
const filterByType = (type, ...values) => values.filter(value => typeof value === type),




	hideAllResponseBlocks = () => {
		// создает массив из блоков с определенныи классом 
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); 
		responseBlocksArray.forEach(block => block.style.display = 'none'); // проходится по массиву и у каждого эл. меняет display (убирает со страницы)
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // (блок, текст в спане, спан)
		hideAllResponseBlocks(); // меняет у всех div'ов style.display на none
		document.querySelector(blockSelector).style.display = 'block'; // у блока, который мы передали, меняет diplay 
		if (spanSelector) { // если передали спан то: 
			document.querySelector(spanSelector).textContent = msgText; // передает туда текст (msgText)
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // вызвается при ошибке

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // вызвается, если нет ошибок

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //  вызвается, если строка 'Данные' оказалась пустой

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(', '); // с помощью eval
			const alertMsg = (valuesArray.length) ?     // длина > 0, есть ли длинна, существует ли длина у строки valuesArray?
				`Данные с типом ${type}: ${valuesArray}` : // да 
				`Отсутствуют данные типа ${type}`; // нет
			showResults(alertMsg);
		} catch (e) {	// если в строке ошибка:
			showError(`Ошибка: ${e}`); // передает текст с ошибкой 
		}
	};

const filterButton = document.querySelector('#filter-btn'); // кнопка "фильтровать"

filterButton.addEventListener('click', e => { // навешивает слушателя на кнопку "фильтровать"
	const typeInput = document.querySelector('#type'); // "Тип данных"
	const dataInput = document.querySelector('#data'); // "Данные"

	if (dataInput.value === '') { // если строка с данными пуста то:
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // выводит сообщение об ошибке в строке 
		showNoResults();
	} else {
		dataInput.setCustomValidity(''); // Не лишняя ли строчка?
		e.preventDefault(); // что бы не перезапускало страницу 
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // передает в функцию тип данных и сами данные 
		// (зачем при передачи typeInput.value использовать trim()? value то прописан в options)
	}
});

