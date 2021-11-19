import './sass/main.scss';
import { NewApiService } from './js/apiService';
import { searchImages } from 'pixabay-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('.search-form');
const submitBtn = document.querySelector('.button');
searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  evt.preventDefault();
}
