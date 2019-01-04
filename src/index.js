const beerList = document.querySelector('#list-group')
const beerDisplay = document.querySelector('#beer-detail')
// const editBtn = document.querySelector('#edit-beer')
// console.log(beerDisplay)
let allBeers = []
// console.log(beerList)
fetch('http://localhost:3000/beers')
.then(res => res.json())
.then(beers => {
  allBeers = beers
  renderBeers(beers)
})
function renderBeers(beers) {
  beers.forEach((beer) => {renderOneBeer(beer)})
}
function renderOneBeer(beer) {
  return beerList.innerHTML += `
  <li data-id=${beer.id} class="list-group-item">${beer.name}</li>
  `
}
beerList.addEventListener('click', (e) => {
  const foundBeer = allBeers.find(beer => beer.id == e.target.dataset.id)
  beerDisplay.innerHTML = `
  <h1>${foundBeer.name}</h1>
<img src="${foundBeer.image_url}">
<h3>${foundBeer.tagline}</h3>
<textarea>${foundBeer.description}</textarea>
<button data-id=${foundBeer.id} id="edit-beer" class="btn btn-info">
  Save
</button>
  `
})
beerDisplay.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON') {
    const foundBeer = allBeers.find(beer => beer.id == e.target.dataset.id)
    const beerId = foundBeer.id
    // console.log(beerId)
    // console.log(foundBeer)
    const description = e.target.parentNode.children[3].value
    // console.log(description)
    // console.log(description)
    const headers = {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify({
        description: description
      })
    }
    foundBeer.description = description
    foundBeer.id = e.target.dataset.id
    fetch(`http://localhost:3000/beers/${beerId}`, headers)
    .then(res => res.json())
    .then(editedBeer => {
      // console.log(editedBeer);
      renderOneBeer(editedBeer)
    })
}
})
