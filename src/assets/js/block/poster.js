import { Day, numberDay } from './calendar'
import * as conf from '../config/films.config';

const   poster = document.querySelector('.poster');

const   generateOneDay = () => {
    let minuts = 0;
    let day = {};
    for (let hours = 11; hours < 22; hours += 1)
    {
        let id = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
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

const arr = initRandomFilm();

let index = 0;
const renderToday = (day) =>{
    let fragment = '';
    for (const iterator of Object.values(arr[day])) {
        console.log(iterator);
        fragment += `
        <div>
            <h4>${iterator.title}</h4>
            <img src="${iterator.url}" alt="">
        </div>`
    }
    poster.insertAdjacentHTML('afterbegin', fragment);
}

renderToday(index);
