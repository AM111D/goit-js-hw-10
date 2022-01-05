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
  <img src="${flags.svg}" alt="{name.official}" width=80>
  <h2 class="text_color">${name.official}</h2>
</div>

<div class="wrapper">
  <p class="text_color">Capital:<b>${capital}</b></p>
</div>


<div class="wrapper">
  <p class="text_color">Population:<b>${population}</b></p>
</div>

<div class="wrapper">
 
  <p class="text_color">Languages:<b>${Object.values(languages)}</b></p>
</div>`
}