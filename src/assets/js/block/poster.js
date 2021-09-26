import {numberDay, URL} from '../config/config'
// // import { renderModalWindow } from './modalWindow';
import {data} from '../api/api'
import * as conf from '../config/films.config';
import axios from 'axios';
import { createContentModal } from './modalWindow';

const   poster = document.querySelector('.poster');

export const renderToday = () =>{
    let fragment = '';
    for (const iterator of Object.values(data)) {
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
        window.modal(createContentModal(filmName, data), 0);
        // renderModalWindow(0, filmName, data);
})
