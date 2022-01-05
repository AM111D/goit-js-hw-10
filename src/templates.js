export function showCounterList({ flags, name }) {
    return `
    <li>
  <img src="${flags.svg}" alt="${name.official}" width=50>
  <h2>${name.official}</h2>
</li>
`
}

export function showCounterCards({ flags, name, capital, population, languages }) {
    return `<div class="wrapper">
  <img src="${flags.svg}" alt="{name.official}" width=50>
  <h2>${name.official}</h2>
</div>

<div class="wrapper">
  <p>Capital:</p>
  <span>${capital}</span>
</div>

<div class="wrapper">
  <p>Population:</p>
  <span>${population}</span>
</div>

<div class="wrapper">
  <p>Languages:</p>
  <span>${languages}</span>
</div>`
}