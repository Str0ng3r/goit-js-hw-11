export function htmlLog (array) {
    return array.map(el => { return `<div class="photo-card"><a href='${el.largeImageURL}' class='link-img'><img class = 'size-img' src="${el.webformatURL}" alt="${el.tags}" data-source = '${el.largeImageURL}' loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes</b>${el.likes}</p><p class="info-item"><b>Views</b>${el.views}</p><p class="info-item"><b>Comments</b>${el.comments}</p><p class="info-item"><b>Downloads</b>${el.downloads}</p></div></div>`;
}).join('')
}