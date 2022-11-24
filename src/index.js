import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  searchBox: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener(
  'input',
  debounce(onSearchboxInput, DEBOUNCE_DELAY)
);

function onSearchboxInput(evt) {
  const name = evt.target.value.trim();
  if (!name == '') {
    fetchCountries(name).then(dataProcessing);
  }
}

function dataProcessing(data) {
  if (data.length <= 10) {
    if (data.length === 1) {
      refs.list.innerHTML = '';
      refs.info.innerHTML = createMarkupCountry(data);
    } else {
      refs.list.innerHTML = createMarkupList(data);
    }
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function createMarkupList(arr) {
  return arr
    .map(
      ({ name, flags }) =>
        `<li class="list-country-item"><img src="${flags.svg}" alt="${name.official}'s flag" width="45" height="30"><p class="list-country-name">${name.official}</p></li>`
    )
    .join('');
}

function createMarkupCountry(arr) {
  return arr
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class="card-title">
          <img src="${flags.svg}" alt="${name.official}'s flag" width="60" height="40">
          <h1 class="card-country-name">${name.official}</h1>
        </div>
        <p class="country-prop"><span class="country-prop-name">Capital:</span> ${capital}</p>
        <p class="country-prop"><span class="country-prop-name">Population:</span> ${population}</p>
        <p class="country-prop"><span class="country-prop-name">Languages:</span> ${Object.values(
        languages
        )}</p>`
    )
    .join('');
}
