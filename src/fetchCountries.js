import { Notify } from 'notiflix';

export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name';
  const options = 'fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}/${name}?${options}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}
