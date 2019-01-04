const beerNameList = document.querySelector("#list-group")
const beerDetail = document.querySelector("#beer-detail")
// const saveButton = document.querySelector("#edit-beer")

fetch("http://localhost:3000/beers")
.then(response => response.json())
.then(beerData => {
  beerData.forEach(beer => {
    beerNameList.innerHTML += `<li data-id="${beer.id}" class="list-group-item">${beer.name}.</li>`
  })

  beerNameList.addEventListener("click", (event) => {
    const clickedBeerId = event.target.dataset.id
    const findBeer = beerData.find(beer => beer.id == clickedBeerId)

    beerDetail.innerHTML =
      `<h1>${findBeer.name}</h1>
        <img src="${findBeer.image_url}">
        <h3>${findBeer.tagline}</h3>
        <form id="edit-form">
          <textarea id="edit">${findBeer.description}</textarea>
          <button id="edit-beer" class="btn btn-info">
            Save
          </button>
        </form>`


    const editForm = document.querySelector("#edit-form")
    editForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const editedDescription = document.querySelector("#edit").value
      // debugger
      fetch(`http://localhost:3000/beers/${findBeer.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: editedDescription
        })
      }).then(response => response.json())
      .then(patchedBeer => console.log(patchedBeer))
    })
  })


})
