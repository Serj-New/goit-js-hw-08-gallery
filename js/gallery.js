import galleryArray from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    lightboxCloseBtn: document.querySelector('.lightbox__button'),
};

const galleryMarkup = makeGalleryMarkup(galleryArray);
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

refs.gallery.addEventListener('click', onClickImg);
refs.lightbox.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON' || e.target.nodeName !== 'IMG') {
    closeModal();
  }
});
window.addEventListener("keyup", keyboardPress);

function makeGalleryMarkup(items) {
    return galleryArray.map(({ preview, original, description }) => {
        return `
        <li class="gallery_item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src='${preview}' data-source='${original}' alt='${description}'>
            </a>
        </li>`;
    }).join('');
};

function onClickImg(e) {
    e.preventDefault()
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    refs.lightbox.classList.add('is-open');
    refs.lightboxImage.src = e.target.dataset.source;
    refs.lightboxImage.alt = e.target.alt
}

function closeModal(e) {
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
}

let activeIndex = null;

function keyboardPress({ key }) {
  switch (key) {
    case galleryArray.length - 1 > activeIndex && "ArrowRight":
      activeIndex += 1;
      refs.lightboxImage.src = galleryArray[activeIndex].original;
      break;
    case activeIndex > 0 && "ArrowLeft":
      activeIndex -= 1;
      refs.lightboxImage.src = galleryArray[activeIndex].original;
      break;
    case activeIndex === galleryArray.length - 1 && "ArrowRight":
      activeIndex = 0;
      refs.lightboxImage.src = galleryArray[activeIndex].original;
      break;
    case activeIndex === 0 && "ArrowLeft":
      activeIndex = galleryArray.length - 1;
      refs.lightboxImage.src = galleryArray[activeIndex].original;
      break;
    case "Escape":
      closeModal();
      break;
  }
}
