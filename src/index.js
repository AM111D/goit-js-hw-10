import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from '../node_modules/debounce';
// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showCounterList, showCounterCards } from './templates';


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    let searchCountry = searchBox.value;
    // console.log(searchBox.value);
    if (searchCountry.trim() === "") {
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }

    fetchCountries(searchCountry.trim())
        .then(countries => {
        console.log(countries)
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
         countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }
    if (countries.length >= 2 && countries.length <= 10) {
        const listMarkup = countries.map(country => showCounterList(country))
        countryList.innerHTML = listMarkup.join('');
        countryInfo.innerHTML = "";
    }
        
        if (countries.length === 1) {
            const countryCardMarkup = countries.map(country => showCounterCards(country));
              countryList.innerHTML = "";
        countryInfo.innerHTML = countryCardMarkup.join('');
        }
    })
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return error;
    })

};





