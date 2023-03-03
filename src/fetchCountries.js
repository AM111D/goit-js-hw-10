function fetchCountries(name) {
  const settings = 'name,capital,population,flags,languages';
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${settings}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
