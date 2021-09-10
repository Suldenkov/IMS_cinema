import {numberDay} from '../config/config'
import { renderModalWindow } from './modalWindow';
import * as conf from '../config/films.config';

const   randomNum = 7;
const   poster = document.querySelector('.poster');

const   generateOneDay = () => {
    let minuts = 0;
    let day = {};
    for (let hours = 11; hours < 22; hours += 1)
    {
        let id = Math.floor(Math.random() * (randomNum - 1 + 1)) + 1;
        if (id in day)
            day[id].times.push(`${hours}:${minuts === 0 ? '00' : minuts}`);
        else
            day[id] = {...conf.obj[id], times: [`${hours}:${minuts === 0 ? '00' : minuts}`]};
        if (minuts == 30)
            minuts = 0;
        else
            minuts = 30;
    }
    return day;
}

const   initRandomFilm = () =>{
    const   arr = [];
    for (let iter = 0; iter < numberDay; ++iter)
    {
        arr[iter] = generateOneDay();
    }
    return arr;
}

export const arr = initRandomFilm();

export const renderToday = (day) =>{
    let fragment = '';
    for (const iterator of Object.values(arr[day])) {
        fragment += `
        <div class="poster__film" data-title="${iterator.title}">
            <div class="poster__film__view">
                <img class="poster__film__img" src="${iterator.url}" alt="">
            </div>
            <h4 class="poster__film__title">${iterator.title}</h4>
        </div>`
    }
    poster.innerHTML = fragment;
}

poster.addEventListener('click', (e) => {
    let filmName = '';
    console.log(e.target);
    if (e.target.closest('div').parentElement.className === 'poster__film')
        filmName = e.target.closest('div').parentElement.dataset.title;
    else if (e.target.closest('div').className === 'poster__film')
        film = e.target.closest('div').dataset.title;
    if (filmName !== '')
        renderModalWindow(0, filmName, arr);
})
