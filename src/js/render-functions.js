import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
    loader?.classList.remove("is-hidden");
}

const lightbox = new SimpleLightbox(`.gallery a`, {
    captionsData: `alt`,
    captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(img => `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <div class="photo-card">
          <img class="photo-card-img"
               src="${img.webformatURL}"
               alt="${img.tags}"
               loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b><span>${img.likes}</span></p>
            <p class="info-item"><b>Views</b><span>${img.views}</span></p>
            <p class="info-item"><b>Comments</b><span>${img.comments}</span></p>
            <p class="info-item"><b>Downloads</b><span>${img.downloads}</span></p>
          </div>
        </div>
      </a>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
export function hideLoader() {
    loader?.classList.add("is-hidden");
}
