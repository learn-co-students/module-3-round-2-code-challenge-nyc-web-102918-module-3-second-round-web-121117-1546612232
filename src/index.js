const beerList = document.querySelector('.list-group')
const beerDetail = document.querySelector('#beer-detail')

let allBeers = []

function fetchBeers() {
  fetch('http://localhost:3000/beers')
  .then((r) => r.json())
  .then((data) => {
    allBeers = data
    showBeers(data)
  })
}

function showBeers(data) {
  data.forEach((beer) => {
    beerList.innerHTML += renderSingleBeer(beer)
  })
  const beerName = document.querySelectorAll('.beer-name')
  let beerNameArray = [...beerName]
  beerNameArray.forEach((beer) => {
    beer.addEventListener('click', (e) => {
      let foundBeer = allBeers.find((beer) => {
        return beer.id == e.target.dataset.id
      })
      beerDetail.innerHTML = `
      <h3>${foundBeer.name}</h3>
      <img src=${foundBeer.image_url}>
      <div id="text-area" contenteditable>${foundBeer.description}</div>
      <button class="submit-button" data-id="${foundBeer.id}">Submit</button>
      `
      const submitButton = document.querySelector('.submit-button')
      const beerDescription = document.querySelector('#text-area').innerText
      submitButton.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/beers/${e.target.dataset.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify({
            description: beerDescription
          })
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
        })
      })
    })
  })
}

function renderSingleBeer(beer) {
  return  `
   <h3 class="beer-name" data-id="${beer.id}">${beer.name}</h3>
   `
}
fetchBeers()
