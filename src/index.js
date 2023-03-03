import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from '../node_modules/lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('#search-box'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const nameSearch = refs.searchForm.value.trim();
  console.log(nameSearch);
  if (refs.searchForm === ' ') {
    return;
  }
  //   console.dir(name);
  fetchCountries(nameSearch)
    .then(coutry => {
      if (refs.nameSearch === ' ') {
        return;
      }
      console.log(coutry);
    })
    .catch(error => {
      console.log(error);
    });
}
