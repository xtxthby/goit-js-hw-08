// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
galleryContainer.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));

function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
`
  }).join('');
}

// використовую бібліотеку SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  // отримуємо заголовок, положення заголовку, затримка перед показом.
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});


