import {numberDay, URL} from '../config/config'
import {modal} from '../index'
import {data} from '../api/api'
import * as conf from '../config/films.config';
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
    if (filmName !== ''){
        let current = Object.values(data).filter(offer => offer.title === filmName)[0];
        modal.setData(current);
        modal.setTitle(`График сеансов на ${document.querySelector('.slider__currentDay').children[0].textContent}`)
        modal.setContent(createContentModal(current));
        modal.open();
    }
})
