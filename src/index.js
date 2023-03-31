'use strict'
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix'
const formSearch = document.querySelector('#search-form')
const inputSearch = document.querySelector('.input-search')
const mainGallery = document.querySelector('.main-gallery')
const photoCard = document.querySelector('.photo-card')
const buttonLoad = document.querySelector('.load')
let inputValue = null
const URLBASIC = 'https://pixabay.com/api/';
const MYAPI = '34891716-36b65b6efae61fa69d260cb9b'
import axios from "axios";
inputSearch.addEventListener('input',(event)=> {
    inputValue = event.target.value.trim()
})
let page = 0
function getResultPhoto (name) {
    page += 1
    axios.get(`${URLBASIC}?key=${MYAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    .then(res => {
         return res
        })
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
           const textContents = massSearch.map(el => { return `<div class="photo-card"><a href='${el.largeImageURL}' class='link-img'><img class = 'size-img' src="${el.webformatURL}" alt="${el.tags}" data-source = '${el.largeImageURL}' loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes</b>${el.likes}</p><p class="info-item"><b>Views</b>${el.views}</p><p class="info-item"><b>Comments</b>${el.comments}</p><p class="info-item"><b>Downloads</b>${el.downloads}</p></div></div>`;
            }).join('')
            mainGallery.insertAdjacentHTML('beforeend',textContents)
            let lightbox = new SimpleLightbox('.photo-card a', {captions: true,captionSelector: 'img',captionsType:'text',captionsData:'alt',captionDelay:250});
            lightbox.refresh();
        })
    }



buttonLoad.addEventListener('click',()=> {
    getResultPhoto(inputValue)
})
formSearch.addEventListener('submit',(event)=> {
    event.preventDefault()
    page = 0
    mainGallery.innerHTML = '';
    getResultPhoto(inputValue)
})