import { renderToday } from './poster';
import * as conf from '../config/config'

const   calendar = document.querySelector('.slider__days');
const   leftArrow = document.querySelector('.arrow__left');
const   rightArrow = document.querySelector('.arrow__right');
let     day = 0;

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
    calendar.innerHTML = fragment;
}

createCalendar();
renderToday(day);
calendar.addEventListener('click', (e) => {
    day = parseInt(e.target.closest('div').dataset.id);
    createCalendar()
    renderToday(day);
})


let offset = 0;
let widthBlock = calendar.children[0].offsetWidth;

rightArrow.addEventListener('click', () =>{
    if (60 / 2 + 10 < offset / -widthBlock)
        return ;
    offset -= widthBlock * 5;
    calendar.style.left = `${offset}px`;
    if (offset != 0)
        leftArrow.style.display = 'block';
});

leftArrow.addEventListener('click', () =>{
    offset += widthBlock * 5;
    calendar.style.left = `${offset}px`;
    if (offset == 0)
        leftArrow.style.display = 'none';
});


