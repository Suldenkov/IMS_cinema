import { postBuy } from '../api/api';
import {$} from '../config/config'
let countPlaceRow = 20;

// const renderArea = (places) => {
// 	let row = 1;
// 	let countPlace = 20;
// 	let fragment = places.reduce((accamulator, value, index) => {
// 		let place = index > countPlace -1 ? index % countPlace + 1: index + 1;
// 		if (index !== 0 && index % countPlace === 0)
// 			accamulator += `</div><div class="row"><span class="row__title">Ряд ${row++}</span>`
// 		return accamulator += `<span data-id="${row - 2}-${place - 1}" class="place${value ? ' place__busy' : ' place__free'}">${place}</span>`;
// 	}, `<div class="row"><span class="row__title">Ряд ${row++}</span>`);
// 	fragment += `</div>`;
// 	return (fragment);
// }

// const renderTotalPrice = (amount, price) => {
// 	let fragment = amount === 0 ? '' : `<div class="total">
// 											<span class="total__amount">
// 												Биллетов: ${amount}
// 											</span>
// 											<span class="total__price">
// 												Итого: ${amount * price}₽
// 											</span>
// 										</div>
// 										<div class="registration">
// 												<button class="registration__buy">Купить</button>
// 										</div>`
// 	return fragment;
// }

// export const renderModalWindow = (day, film, arr) => {
	
// 	let films = ['Шан-Чи и легенда десяти колец', 'Нефутбол', 'Мафия', 'Отряд самоубийц 2', 'После. глава 3', 'Главный герой', 'Воспоминание'];
// 	let today = arr[films.indexOf(film) + 1];
// 	let title = `<span class="modal__title">График сеансов на ${day}</span>`
// 	let times = Object.keys(today.seans);
// 	let seans = '';
// 	let currentSeans = 0;
// 	let amount = 0;
// 	let price = 240;

// 	times.forEach((element, id) => {
// 		seans +=`<span data-id="${id}" class="modal__time${id === 0 ? ' current_time' : ''}">${element}</span>`;
// 	});

// 	document.body.insertAdjacentHTML('afterbegin', `
// 		<div class="modal">
// 			<div class="modal__overlay">
// 				<div class="modal__window">
// 					<div class="modal__header">
// 						${title}
// 						<span class="modal__close">&#10006</span>
// 					</div>
// 					<div class="modal__body">
// 						<div class="modal__time_table">
// 							${seans}
// 						</div>
// 						<div class="modal__content">
// 							${renderArea(today.seans[times[currentSeans]])}
// 						</div>
// 					</div>
// 					<div class="modal__footer">
// 						${renderTotalPrice(amount, price)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	`);

// 	document.querySelector('.modal__content').addEventListener('click', (e) => {
// 		if (e.target.getAttribute('data-id') !== null && !e.target.classList.contains('place__busy')){
// 			let arr = e.target.getAttribute('data-id').split('-');
// 			let place = Number(arr[0]) === 0 ? Number(arr[1]) : Number(arr[0]) * countPlace + Number(arr[1]);
// 			if (e.target.classList.contains('place__selected')){
// 				today.seans[times[currentSeans]][place] = 0;
// 				amount -= 1;
// 			}
// 			else{
// 				today.seans[times[currentSeans]][place] = 1;
// 				amount += 1;
// 			}
// 			document.querySelector('.modal__footer').innerHTML = renderTotalPrice(amount, price);
// 			let button = document.querySelector('.registration__buy');
// 			if (button !== null){
// 				button.addEventListener('click', () =>{
// 						postBuy();
// 						document.querySelector('.modal').remove();
// 				});
// 			}
// 			e.target.classList.toggle(`place__selected`);
// 			e.target.classList.toggle(`place__free`);
// 		}
// 	})

// 	document.querySelector(".modal__time_table").addEventListener('click', (e) => {
// 		if (e.target.getAttribute('data-id') !== null){
// 			let allSeans = document.querySelectorAll('.modal__time');
// 			allSeans[currentSeans].classList.remove('current_time');
// 			currentSeans = e.target.getAttribute('data-id');
// 			allSeans[currentSeans].classList.add('current_time');
// 			document.querySelector('.modal__content').innerHTML = renderArea(today.seans[times[currentSeans]]);
// 		}
// 	})
	
// 	document.querySelector(".modal__close").addEventListener('click', () => {
// 		document.querySelector('.modal').remove();
// 	});

// 	document.querySelector('.modal').addEventListener('click', (e) => {
// 		if (e.target.className == 'modal__overlay')
// 			document.querySelector('.modal').remove();
// 	});

// }

const choicePlace = () => {
	let countPlace = 0;
	let data = {};

	return ({
		addPlace: (place, time) => {
			if (!(time in data))
				data[time] = [];
			data[time].push(place);
			countPlace++;
		},
		removePlace: (place, time) => {
			if (!(time in data))
				data[time] = [];
			let index = data[time].indexOf(place);
			data[time].splice(index, 1);
			countPlace--;
		},
		getCountPlace(){
			return countPlace;
		},
		getChoicePlace(){
			return data;
		},
		setCountPlace(count){
			countPlace = count;
		},
		setPlace(){
			data = {};
		}
	})
}

const renderArea = (places) => {
	let row = 1;
	let countPlace = 20;
	let fragment = places.reduce((accamulator, value, index) => {
		let place = index > countPlace -1 ? index % countPlace + 1: index + 1;
		if (index !== 0 && index % countPlace === 0)
			accamulator += `</div><div class="row"><span class="row__title">Ряд ${row++}</span>`
		return accamulator += `<span data-place="${row - 2}-${place - 1}" class="place${value ? ' place__busy' : ' place__free'}">${place}</span>`;
	}, `<div class="row"><span class="row__title">Ряд ${row++}</span>`);
	return (fragment + '</div>');
}

export const createContentModal = (data) => {
	const times = Object.keys(data.seans);
	let content = '<div class="modal__time_table">';

	times.forEach((element, id) => {
		content +=`<span data-time="${id}" class="modal__time${id === 0 ? ' current_time' : ''}">${element}</span>`;
	});
	content += `</div>
				<div class="modal__content">
					${renderArea(data.seans[times[0]])}
				</div>`;

	return content;
}

const updatePlace = (data, placeControl) => {
	let obj = placeControl.getChoicePlace();
	Object.keys(obj).forEach((key) => {
		obj[key].forEach((index) => {
			data.seans[key][index] = 1;
		})
	})
	postBuy();
}

const createFooter = (placeControl, price, $modal, modal, data) => {
	let amount = placeControl.getCountPlace();
	let fragment = amount === 0 ? '' : `<div class="total">
											<span class="total__amount">
												Биллетов: ${amount}
											</span>
											<span class="total__price">
												Итого: ${amount * price}₽
											</span>
										</div>
										<div class="registration">
												<button class="registration__buy">Купить</button>
										</div>`
	$modal.querySelector('.modal__footer').innerHTML = fragment;
	const button = document.querySelector('.registration__buy');
	if (button !== null){
		button.addEventListener('click', () => {
			updatePlace(data, placeControl)
			modal.close();
		});
	}
}

const _createModal = (content, title) => {
	const modal = document.createElement('div');

	modal.classList.add('modal');
	modal.insertAdjacentHTML('afterbegin', `
			<div class="modal__overlay" data-close="true">
				<div class="modal__window">
					<div class="modal__header">
						<span class="modal__title" data-title>График сеансов на ${title}</span>
						<span class="modal__close" data-close="true">&#10006</span>
					</div>
					<div class="modal__body" data-content>
						${content}
					</div>
					<div class="modal__footer">
						
					</div>
				</div>
			</div>
	`);
	document.body.appendChild(modal);
	return modal;
}

$.modal = (content, title) => {
	const $modal = _createModal(content, title);
	const modal = {
		open(){
			$modal.classList.add('modal__open');
		},
		close(){
			$modal.classList.remove('modal__open');
		},
		setContent(contentHtml){
			$modal.querySelector('[data-content]').innerHTML = contentHtml;
		}
	};
	let data = {};
	let placeControl = choicePlace();

	$modal.addEventListener('click', (e) => {
		if (e.target.dataset.close)
			modal.close();
		else if (e.target.dataset.time){
			$modal.querySelector('.current_time').classList.remove('current_time');
			e.target.classList.add('current_time');
			$modal.querySelector('.modal__content').innerHTML = renderArea(data.seans[e.target.textContent]);

			placeControl.setCountPlace(0);
			placeControl.setPlace();
			createFooter(placeControl, 180, $modal, modal, data);
		}
		else if (e.target.dataset.place && !e.target.classList.contains('place__busy')){
			let arr = e.target.dataset.place.split('-');
			let time = $modal.querySelector('.current_time').textContent;
			let place = Number(arr[0]) === 0 ? Number(arr[1]) : Number(arr[0]) * countPlaceRow + Number(arr[1]);
			if (e.target.classList.contains('place__selected'))
				placeControl.removePlace(place, time);
			else
				placeControl.addPlace(place, time);
			createFooter(placeControl, 180, $modal, modal, data);
			e.target.classList.toggle(`place__selected`);
			e.target.classList.toggle(`place__free`);
		}
	})

	return Object.assign(modal, {
		setData(obj){
			data = obj;
			placeControl.setCountPlace(0);
			placeControl.setPlace();
			createFooter(placeControl, 180, $modal, modal, data);
		},
		setTitle(titleHtml){
			$modal.querySelector('[data-title]').innerHTML = titleHtml;
		}
	})
}