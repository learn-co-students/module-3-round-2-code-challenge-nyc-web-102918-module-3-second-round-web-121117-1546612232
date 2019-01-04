document.addEventListener("DOMContentLoaded", function(){

const url ='http://localhost:3000/beers'
const beerList = document.querySelector('#list-group')
const beerStuff = document.querySelector('#beer-detail')

  fetch(url)
  .then(function(response){
    return response.json()
  })
  .then(function(beerData){
    beerData.forEach(function(beer){
      beerList.innerHTML += `<li class="list-group-item" id="${beer.id}" data-action = "beernameclicked">${beer.name}</li>`
    })
  })

  document.addEventListener('click', function(event){
    if(event.target.dataset.action === "beernameclicked"){
      let clickedId = event.target.id
      fetch(`${url}/${clickedId}`)
      .then(function(response){
        return response.json()
      })
      .then(function(beerInfo){
        beerStuff.innerHTML = `<h1>${beerInfo.name}</h1>
                                  <img src="${beerInfo.image_url}">
                                  <h3>${beerInfo.tagline}</h3>
                                  <textarea id="edit-${beerInfo.id}">${beerInfo.description}</textarea>
                                  <button id="edit-beer" data-action= "edit" data-id= "${beerInfo.id}" class="btn btn-info">Save</button>`
      })
    }
  })

  beerStuff.addEventListener('click', function(event){
    if(event.target.dataset.action === "edit"){
      let editId = event.target.dataset.id
      let ogText = event.target.parentNode.querySelector(`#edit-${editId}`).innerHTML
      let editText = document.querySelector(`#edit-${editId}`).value
      // debugger
      fetch(`${url}/${editId}`,
        {method:"PATCH",
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           description: editText
         })
      })
       .then(function(response){
         return response.json()
       })
       .then(function(beerData){
         // console.log(beerData.description)
         editText.innerHTML = `${beerData.description}`
       })



    }
  })









}) // END OF DOMContentLoaded
