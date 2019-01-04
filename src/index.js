document.addEventListener('DOMContentLoaded', () =>{
  const beerList = document.getElementById("list-group")
  const beerTable =document.getElementById("beer-detail")

  fetch('http://localhost:3000/beers')
  .then(response => response.json())
  .then(beers => {
    beers.forEach(beer => {
      beerList.innerHTML += `
                            <ul class="list-group">
                              <li class="list-group-item" id= ${beer.id} data-action= "beer-click">${beer.name}</li>
                            </ul>`
    })
    beerList.addEventListener('click', (event) =>{
      console.log(event.target.id);
      console.log(event.target.dataset.action);
      let beerId = parseInt(event.target.id)
      if (event.target.dataset.action === "beer-click"){
        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(response => response.json())
        .then(beerInfo => {
          beerTable.innerHTML += `
          <h1>${beerInfo.name}</h1>
          <img src="${beerInfo.image_url}"/>
          <h3>${beerInfo.tagline}</h3>
          <textarea id = "text-value">${beerInfo.description}</textarea>
          <button id="edit-beer" data-id= ${beerInfo.id} class="btn btn-info">
            Save
          </button>`
        })
      }
    })
  })
  document.addEventListener('click', (event)=>{
    let saveBeerId = event.target.dataset.id
    let editButton = event.target.id


    if (event.target.id === "edit-beer"){
      let textValue = document.getElementById("text-value").value
      console.log(textValue);
      fetch(`http://localhost:3000/beers/${saveBeerId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'},
        body: JSON.stringify({
          description: textValue
      })
      })
      .then(response => response.json())
      .then(text => console.log(text))

  }
})
})
