document.addEventListener('DOMContentLoaded', () => {
  console.log('%c im loadeddd', 'color: yellow')


  const url = 'http://localhost:3000/beers'
  let allBeersData = []
  const ul = document.getElementById('list-group')
  let detailDiv = document.getElementById('beer-detail')


  fetch(url)
    .then(res => res.json())
    .then(allBeersJSON => {
      allBeersData = allBeersJSON
      ul.innerHTML = renderUl(allBeersJSON)
    })


    ul.addEventListener('click', e => {
      let beerId = parseInt(e.target.dataset.id)
      let foundBeer = allBeersData.find(b => b.id === beerId)
      getSingleBeer(foundBeer.id)
    })
  
    detailDiv.addEventListener('click', e => {
      e.preventDefault()
      if (e.target.id === 'edit-beer') {
        let id = parseInt(e.target.dataset.id)
        console.log(id)
        let textInput = document.querySelector('textarea').value
        let targetBeer = allBeersData.find(input => {
          console.log(input)
          return input.id === id
        })
        console.log(targetBeer)
        let targetIdx = allBeersData.findIndex(b => b.id === targetBeer.id)
        targetBeer.description = textInput
        allBeersData[targetIdx] = targetBeer
        console.log(allBeersData[targetIdx])
        patchBeer(targetBeer.id, {
          description: targetBeer.description
        })
      }
    })


  function renderUl(data) {
    return data.map(renderLi).join('')
  }

  function renderLi(beer) {
    return `<li class="list-group-item" data-id='${beer.id}'>${beer.name}</li>`
  }

  function renderBeerDetails(beer) {
    return `
    <h1 data-id='${beer.id}'> ${beer.name} </h1>
    <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea data-id='${beer.id}'>${beer.description}</textarea>
      <button data-id='${beer.id}' id="edit-beer" class="btn btn-info">Save</button>`
  }

  function getSingleBeer(id) {
    fetch(`${url}/${id}`)
      .then(res => res.json())
      .then(beer => detailDiv.innerHTML = renderBeerDetails(beer))
  }

  function patchBeer(id, body) {
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
  }


}) //  /> end script