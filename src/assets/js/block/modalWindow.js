const renderArea = (places) => {
	// let fragment = '';
	let countPlace = 20;
	let row = 1;
	let fragment = places.reduce((accamulator, value, index) => {
		if (index !== 0 && index % countPlace === 0)
			accamulator += `</div><div class="row">`
		return accamulator += `<span class="place${value ? 'place__busy' : ''}">${index > countPlace -1 ? index % countPlace + 1: index + 1}</span>`;
	}, '<div class="row">');
	fragment += `</div`;
	return (fragment);
}

export const renderModalWindow = (day, film, arr) => {
	
	let films = ['Шан-Чи и легенда десяти колец', 'Нефутбол', 'Мафия', 'Отряд самоубийц 2', 'После. глава 3', 'Главный герой', 'Воспоминание'];
	let today = arr[day][films.indexOf(film) + 1];
	let title = `<span class="modal__title">График сеансов на ${day}</span>`
	let seans = '';

	Object.keys(today.seans).forEach((element, id) => {
		seans +=`<span class="modal__time${id === 0 ? ' current_time' : ''}">${element}</span>`
	});

	document.body.insertAdjacentHTML('afterbegin', `
		<div class="modal">
			<div class="modal__overlay">
				<div class="modal__window">
					<div class="modal__header">
						${title}
						<span class="modal__close">&#10006</span>
					</div>
					<div class="modal__body">
						<div class="modal__time_table">
							${seans}
						</div>
						<div class="modal__content">
							${renderArea(today.seans[Object.keys(today.seans)[0]])}
						</div>
					</div>
					<div class="modal__footer">

					</div>
				</div>
			</div>
		</div>
	`);
	
	document.querySelector(".modal__close").addEventListener('click', () => {

		document.querySelector('.modal').remove();
	});

	document.querySelector('.modal').addEventListener('click', (e) => {
		if (e.target.className == 'modal__overlay')
			document.querySelector('.modal').remove();
	})
}
