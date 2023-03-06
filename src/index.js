import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from '../node_modules/lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.countryList.classList.add('countryList');

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  const searchName = refs.searchForm.value.trim();

  if (searchName === ' ') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchName).then(renderCountries).catch(onFetchEError);
  // .finally(() => FormData.reset());
}

function renderCountries(searchName) {
  if (searchName.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name'
    );

    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }
  if (searchName.length >= 2 && searchName.length <= 10) {
    console.log(searchName);
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    refs.countryList.insertAdjacentHTML(
      'afterbegin',
      renderListCountry(searchName)
    );
  }
  if (searchName.length === 1) {
    console.log('kyky');
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    refs.countryInfo.insertAdjacentHTML(
      'afterbegin',
      renderOneCard(searchName)
    );
    console.log(searchName);
  }
}

function onFetchEError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function renderListCountry(searchName) {
  const murkUp = searchName;
  return murkUp
    .map(({ flags, name }) => {
      return `
        <li class='countryListiItem'>
          <img src="${flags.png}" alt="" width='80px' height='50px'>
          <p class='countryListiItem_text'>${name.official}</p>
        </li>`;
    })
    .join('');
}

function renderOneCard(searchName) {
  const card = searchName;
  return card
    .map(({ name, capital, population, flags, languages }) => {
      return `
    <li class='country-info_item'>
  <img src="${flags.svg}" alt="${name.official}" width='100px height='50px'>
  <h2 class='country-info_item_name'>${name.official}</h2>
</li>
<li><span class = 'country-info_item_text'>Capital:</span><span class = 'country-info_item_text_markup'>${capital}</span></li>
<li><span class = 'country-info_item_text'>Population:</span><span class = 'country-info_item_text_markup'>${population}</span></li>
<li><span class = 'country-info_item_text'>Lenguages:</span><span class = 'country-info_item_text_markup'>${Object.values(
        languages
      )}</span></li>`;
    })
    .join('');
}
