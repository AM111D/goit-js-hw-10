// export function fetchCountries(name) {
//   const BASE_URL = 'https://restcountries.com/v3.1/name/';
//   const filters = '?fields=name,capital,population,flags,languages';
//   return fetch('${BASE_URL}${name}${filters}')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });
// }

  export function fetchCountries(name) {
    const searchParams = 'name,capital,population,flags,languages';
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${searchParams}`)
      .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json();
    });
  }

