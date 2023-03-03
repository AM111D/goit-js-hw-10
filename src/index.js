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

    refs.countryList.insertAdjacentHTML(
      'afterbegin',
      renderListCountry(searchName)
    );
  }
  if (searchName.length === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    refs.countryList.insertAdjacentHTML(
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
        <li>
          <img src="${flags.png}" alt="" width='100px'>
          <p>${name.official}</p>
        </li>`;
    })
    .join('');
}

function renderOneCard(searchName) {
  const card = searchName;
  return card
    .map(({ flag, language, name, capital, population }) => {
      return `
    <li>
  <img src="${flag.svg}" alt="${name.official}">
  <h2>${name.official}</h2>
</li>
<li><span>Capital:<span></span>${capital}</span></li>
<li><span>Population:<span></span>${population}</span></li>
<li><span>Lenguages:<span></span>${language}</span></li>`;
    })
    .join('');
}
