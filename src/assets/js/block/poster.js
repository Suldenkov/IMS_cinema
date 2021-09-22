import {numberDay} from '../config/config'
import { renderModalWindow } from './modalWindow';
import {data} from '../api/api'
import * as conf from '../config/films.config';

// const   randomNum = 7;
const   poster = document.querySelector('.poster');

// const   generateOneDay = () => {
//     let day = {};
//     for (let hours = 11; hours < 22; hours += 1){
//         for (let minuts = 0; minuts < 60; minuts += 20){
//             let places = Math.floor(Math.random() * 100) + 100;
//             let time = `${hours}:${minuts === 0 ? '00' : minuts}`;
//             let id = Math.floor(Math.random() * (randomNum - 1 + 1)) + 1;

//             if (typeof day[id] === 'undefined')
//                 day[id] = {...conf.obj[id], seans:{[time]: new Array(places).fill(0)}};
//             else
//                 day[id] = {...conf.obj[id], seans:{...day[id].seans, [time]: new Array(places).fill(0)}};
//         }
//     }
//     return day;
// }

// const   initRandomFilm = () =>{
//     const   arr = [];
//     for (let iter = 0; iter < numberDay; ++iter)
//     {
//         arr[iter] = generateOneDay();
//     }
//     return arr;
// }

export const renderToday = (day) =>{
    let fragment = '';
    for (const iterator of Object.values(data[day])) {
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
    if (e.target.closest('div').parentElement.className === 'poster__film')
        filmName = e.target.closest('div').parentElement.dataset.title;
    else if (e.target.closest('div').className === 'poster__film')
        film = e.target.closest('div').dataset.title;
    if (filmName !== '')
        renderModalWindow(0, filmName, data);
})
