import axios from "axios";
const URLBASIC = 'https://pixabay.com/api/';
const MYAPI = '34891716-36b65b6efae61fa69d260cb9b'
export function getResultPhoto (name,page) {
    return axios.get(`${URLBASIC}?key=${MYAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    }