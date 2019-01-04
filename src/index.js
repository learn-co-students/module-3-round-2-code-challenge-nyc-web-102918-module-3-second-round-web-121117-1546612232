document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM successfully loaded and parsed!', 'color: firebrick')


  const listGroup = document.getElementById('list-group')
  const beerDetail = document.getElementById('beer-detail')
  let allData =[]


  fetch(`http://localhost:3000/beers`)
     .then( response => response.json())
     .then( data => {
       console.log(data)

       data.forEach(beer => {
       listGroup.innerHTML += `<ul class="list-group">
                              <li class="list-group-item" data-id='${beer.id}'>${beer.name} 1</li>

                            </ul>`

        })
    })

    document.addEventListener('click', (e) => {
     // aqui me aseguro que el usuario esta clickeando sobre el blog porqye las classes son iguales

     if (e.target.className === 'list-group-item'){
       const beerSelectedId = parseInt(e.target.dataset.id)
          console.log(beerSelectedId)


      fetch(`http://localhost:3000/beers/${beerSelectedId}`)
      .then( response => response.json())
      .then( data => {
        console.log(data)
        allData = data
        beerDetail.innerHTML = `<h1>${data.name}</h1>
                                <img src=${data.image_url}>
                                <h3>${data.tagline}</h3>
                                <textarea id="edit-${data.id}">${data.description}</textarea>
                                <button id="edit-beer" data-action= "edit" class="btn btn-info" data-id="${data.id}">Save</button>`

      })

     }


        if(e.target.className === 'btn btn-info') {
           console.log("Venezuela")

          let updateId = e.target.dataset.id
          let editado = document.querySelector(`#edit-${updateId}`).value

            fetch(`http://localhost:3000/beers/${updateId}`,
              {method:"PATCH",
              headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                 description: editado
               })
            })
             .then(response => response.json())
             .then(data => {

               editado.innerHTML = `${allData.description}`
             })


      } // fin del if editar


   }) // fin del otro event en el document
})// fin del dom
