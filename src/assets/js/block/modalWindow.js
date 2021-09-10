const modal = document.querySelector('.modal');

export const renderModalWindow = (day, film, arr) => {
	
	let films = ['Шан-Чи и легенда десяти колец', 'Нефутбол', 'Мафия', 'Отряд самоубийц 3', 'После. глава 3', 'Главный герой', 'Воспоминание'];
	let today = arr[day][films.indexOf(film) + 1];
	console.log(today)
	let seans = '';
	today.times.forEach(element => {
		seans +=`<span>${element}</span>`
	});
	let fragment = `
		<div class="modal__title">
		${seans}
		</div>`;
	// documeninsertAdjacentHTML('afterend', fragment);
	modal.innerHTML = fragment;
	modal.style.display = 'block';
}
