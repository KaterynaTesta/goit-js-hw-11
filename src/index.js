import './sass/main.scss';
import NewApiService from './js/apiService';
import { searchImages } from 'pixabay-api';
import templatesPictures from './hbs/templatesPictures.hbs';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.getElementById('search-form'),
  renderGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoad);

const newApiService = new NewApiService();
refs.loadMoreBtn.classList.add('is-hidden');

async function onSearch(e) {
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.searchQuery.value;
  clearPicturesMarkup();
  newApiService.resetPage();

  try {
    const result = await newApiService.fetchPhotos();

    if (newApiService.query === '' || result.hits.length === 0) {
      clearPicturesMarkup();
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      refs.loadMoreBtn.classList.remove('is-hidden');
      Notiflix.Notify.success(`"Hooray! We found ${result.totalHits} images."`);
      picturesMarkup(result.hits);
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoad() {
  try {
    const result = await newApiService.fetchPhotos();
    picturesMarkup(result.hits);

    const lenghtHits = refs.renderGallery.querySelectorAll('.photo-card').length;

    if (lenghtHits >= result.totalHits) {
      Notiflix.Notify.failure('"We are sorry, but you have reached the end of search results."');
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

function picturesMarkup(collection) {
  refs.renderGallery.insertAdjacentHTML('beforeend', templatesPictures(collection));
}

function clearPicturesMarkup() {
  refs.renderGallery.innerHTML = '';
}
