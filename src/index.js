document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM Loaded")

    let allBeer = []

    const beerList = document.getElementById("list-group")
    const beerDetail = document.getElementById("beer-detail")
    const pairingList = document.getElementById("pairing-list")
    const textArea = document.getElementById("text-area")
    

    function fetchBeer(){
        fetch("http://localhost:3000/beers")
            .then(function(response){
                console.log(response)
                return response.json()
            })
            .then(function(beerData){
                console.table(beerData)
                allBeer = beerData
                allBeer.forEach(function(beer){
                    console.log(beer)
                   beerList.innerHTML += renderSingleBeer(beer)
                   
                })
            })
    }


    function renderSingleBeer(beer){
        return (

        `
        <li data-id="${beer.id}" class="list-group-item">${beer.name}</li>
        `)

    }

    function renderBeerDetails(beer){
        return  (`
                    <div id="beer-card">
                    <h1>${beer.name}</h1>
                    <img src="${beer.image_url}">
                    <h3>${beer.tagline}</h3>
                    <textarea id="text-area">${beer.description}</textarea>
                    <li>${beer.first_brewed}</li>
                    <ol>
                    <li>${beer.food_pairing}</li> 
                    </ol>
                    <li>${beer.brewers_tips}</li>
                    <li>${beer.contributed_by}</li>
                    <button id="edit-beer" type="submit" class="btn btn-info"> Save </button>
                    </div>
        `)
    }

        // I NEED TO ITERATE THROUGH THE PAIR LISTINGS BUT DO NOT HAVE TIME SO MOVING ON
    // function listPairings(beer){
    //     beer.food_pairing.forEach(function(food){
    //         pairingList.innerHTML += ` ${beer.food_pairing} `
    //     })
    // }

    

    beerList.addEventListener("click", function(event){
           
        const clickedBeerId = parseInt(event.target.dataset.id)
                console.log(clickedBeerId)
        
        const foundBeer = allBeer.find(function(beer){
            return beer.id === clickedBeerId
        })
                console.log(foundBeer)
        
        beerDetail.innerHTML = renderBeerDetails(foundBeer)

    })

    // DID NOT FINISH THIS IS WHY COMENTED OUT
    beerDetail.addEventListener("submit", function(event){
        // event.preventDefault()
        // textArea.value
        // fetch(`http://localhost:3000/beers/:id`),{
        //     method: "PATCH",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //       },
        //       body: JSON.stringify({
        //         description: textArea.value
        //       })
        //       .then(function(response){
        //           return response.json()
        //       })
        //       .then(function(updateData){
        //         allBeer.push(updateData)

        //       })
        // }


            })


fetchBeer()

})