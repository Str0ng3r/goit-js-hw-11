'use strict'
const URLBASIC = 'https://pixabay.com/api/';
const MYAPI = '34891716-36b65b6efae61fa69d260cb9b'
import axios from "axios";
export function getResultPhoto (name) {
    fetch(`${URLBASIC}?key=${MYAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(res => {
         return res.json()
        })
    }