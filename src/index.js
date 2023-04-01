'use strict'
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import {getResultPhoto} from './functionAPI'
import { htmlLog } from "./htmlfunction";
import { Notify } from 'notiflix'
const formSearch = document.querySelector('#search-form')
const inputSearch = document.querySelector('.input-search')
const mainGallery = document.querySelector('.main-gallery')
const photoCard = document.querySelector('.photo-card')
const buttonLoad = document.querySelector('.load')
let inputValue = null
let inputLeng = 0
import axios from "axios";
let pageS = 0


inputSearch.addEventListener('input',(event)=> {
    inputValue = event.target.value.trim()
    inputLeng = inputValue.length
    console.log(inputLeng)
})




// function getResultPhoto (name) {
//     page += 1
//     axios.get(`${URLBASIC}?key=${MYAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
//     .then(res => {
//          return res
//         })
        // .then(res => {
        //     const massSearch = res.data.hits;

        //     if(massSearch.length > 1){
        //         buttonLoad.classList.remove('non-display')
        //         buttonLoad.classList.add('have-display')
        //         }
        //         if(massSearch.length === 0 ){
        //         Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        //         }
        //         if(massSearch.length <40){
        //             Notify.info('its last photos')
        //         }
        //    const textContents = massSearch.map(el => { return `<div class="photo-card"><a href='${el.largeImageURL}' class='link-img'><img class = 'size-img' src="${el.webformatURL}" alt="${el.tags}" data-source = '${el.largeImageURL}' loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes</b>${el.likes}</p><p class="info-item"><b>Views</b>${el.views}</p><p class="info-item"><b>Comments</b>${el.comments}</p><p class="info-item"><b>Downloads</b>${el.downloads}</p></div></div>`;
        //     }).join('')
        //     mainGallery.insertAdjacentHTML('beforeend',textContents)
        //     let lightbox = new SimpleLightbox('.photo-card a', {captions: true,captionSelector: 'img',captionsType:'text',captionsData:'alt',captionDelay:250});
        //     lightbox.refresh();
        // })
//     }








formSearch.addEventListener('submit',(event)=> {
    event.preventDefault()
    if(inputLeng === 0){
        Notify.failure('You dont write name country')
    return
    }
    pageS = 0
    pageS += 1
    mainGallery.innerHTML = '';
    getResultPhoto(inputValue , pageS)
    .then(res => {
        const massSearch = res.data.hits;
        if(massSearch.length > 1){
            buttonLoad.classList.remove('non-display')
            buttonLoad.classList.add('have-display')
            }
            if(massSearch.length === 0 ){
            Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            }
            if(massSearch.length <40){
                Notify.info('its last photos')
            }
       const textContents = htmlLog(massSearch)
        mainGallery.insertAdjacentHTML('beforeend',textContents)
        let lightbox = new SimpleLightbox('.photo-card a', {captions: true,captionSelector: 'img',captionsType:'text',captionsData:'alt',captionDelay:250});
        lightbox.refresh();
    })
})

buttonLoad.addEventListener('click',()=> {
    pageS += 1
    getResultPhoto(inputValue , pageS)
    .then(res => {
        const massSearch = res.data.hits;
        if(massSearch.length === 0 ){
            Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            }
            if(massSearch.length <40){
                Notify.info('its last photos')
            }
       const textContents =htmlLog(massSearch);
        mainGallery.insertAdjacentHTML('beforeend',textContents)
        let lightbox = new SimpleLightbox('.photo-card a', {captions: true,captionSelector: 'img',captionsType:'text',captionsData:'alt',captionDelay:250});
        lightbox.refresh();
    })
})