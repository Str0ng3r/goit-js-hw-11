'use strict'
// import {getResultPhoto} from './searchFunc'
const formSearch = document.querySelector('#search-form')
const inputSearch = document.querySelector('.input-search')
const mainGallery = document.querySelector('.main-gallery')
let inputValue = null
const URLBASIC = 'https://pixabay.com/api/';
const MYAPI = '34891716-36b65b6efae61fa69d260cb9b'
import axios from "axios";
inputSearch.addEventListener('input',(event)=> {
    inputValue = event.target.value.trim()
    console.log('update')
})


function getResultPhoto (name) {
    axios.get(`${URLBASIC}?key=${MYAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(res => {
         return res
        })
        .then(res => {
            const massSearch = res.data.hits;
            console.log(massSearch)
           const textContents = massSearch.map(el => { return `<div class="photo-card"><img class = 'size-img' src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes${el.likes}</b></p><p class="info-item"><b>Views${el.views}</b></p><p class="info-item"><b>Comments${el.comments}</b></p><p class="info-item"><b>Downloads${el.downloads}</b></p></div></div>`;
            }).join('')
            console.log(textContents)
            mainGallery.insertAdjacentHTML('beforeend',textContents)
        })
    }

const searchingPhotos = (event) => {
    event.preventDefault();
    getResultPhoto(inputValue)
    }








formSearch.addEventListener('submit',searchingPhotos)