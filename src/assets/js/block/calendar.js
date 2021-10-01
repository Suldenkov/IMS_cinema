import { renderToday } from './poster';
import { getTimeTable } from '../api/api';
import * as conf from '../config/config'

const   calendar = document.querySelector('.slider__days');
const   leftArrow = document.querySelector('.arrow__left');
const   rightArrow = document.querySelector('.arrow__right');
export let     day = 0;

function getWeekDay(date) {
	let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
	return days[date.getDay()];

}

function getMonth(date)
{
	let months = ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь'];
	return months[date.getMonth()];
}

function createCalendar()
{
    let nextDay = new Date();
    // let fragment = document.createDocumentFragment();
    let fragment = '';

    for (let iter = 0; iter < conf.numberDay; iter++) {
        let week_day = getWeekDay(nextDay);
        
        fragment += `
            <div class="slider__block${iter === day ? ' slider__currentDay' : ''}" data-id="${iter}">
                <span class="slider__date">${nextDay.getDate()}</span>
                <span class="slider__weekDay${week_day == 'СБ' || week_day == 'ВС' ? ' slider__dayOff' : ''}">${week_day}</span>
            </div>
        `;
        nextDay.setDate(nextDay.getDate() + 1);
    }
    calendar.insertAdjacentHTML('afterbegin', fragment);
    // calendar.innerHTML = fragment;
}


createCalendar();
getTimeTable(day + 1)
.then(() => {
    renderToday();
})


calendar.addEventListener('click', (e) => {
    const allDay = document.querySelectorAll('.slider__block');
    allDay[day].classList.remove('slider__currentDay');
    day = parseInt(e.target.closest('div').dataset.id);
    allDay[day].classList.add('slider__currentDay');
    getTimeTable(day + 1)
    .then(() => {
        // console.log(day + 1);
        renderToday();
    })
})


let offset = 0;
let slideCount = 5;
let slide = 0;
let calendarWidth = calendar.offsetWidth;

rightArrow.addEventListener('click', () =>{
    const slideWidth = calendar.children[0].offsetWidth;
    let count = (60 - (Math.floor(calendarWidth / slideWidth) - 1));

    if (count < slide)
        return ;
    offset -= slideCount * slideWidth;
    calendar.style.left = `${offset}px`;
    if (offset != 0)
        leftArrow.style.display = 'block';
    slide += slideCount;
});

leftArrow.addEventListener('click', () =>{
    const slideWidth = calendar.children[0].offsetWidth;

    offset += slideCount * slideWidth;
    calendar.style.left = `${offset}px`;
    if (offset == 0)
        leftArrow.style.display = 'none';
    slide -= slideCount;
});


