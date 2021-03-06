let order = ""
// Populate menyen dynamisk med alle rettene vi har
function setup_meny()
{
    for (var item in mat)
    {      
        document.getElementById("matretter").innerHTML +=
        `<div id="`+mat[item].navn+`" class="matretter">
            <span class="mat_tittel">`+mat[item].navn+`</span>
            &nbsp&nbsp
            <span class="mat_pris">`+mat[item].pris+`,-</span>
            <img src="img/add_button.png" id="`+mat[item].navn+`_button" onclick="add(this.id)" class="order_button">
            <br>
            <span class='inneholder'>`+mat[item].inneholder+`</span>
        </div>`
    }
    // <button id="`+mat[item].navn+`_button" class="order_button" onclick="add(this.id)">Legg til</button>

    // Hver allergi blir tildelt en liste med retter som inneholder den
    allergy_foods = {
        'laktose':[],
        'notter':[],
        'gluten':[]
    }

    // Sorterer matretter etter allergener for lettere sortering
    mat.forEach(food => {
        food.allergener.forEach(all => {
            if(all != "")
            {
                allergy_foods[all].push(food.navn)
            }
        })
    })

    preference_foods = {
        'sterk':[],
        'mild':[],
        'vegetar':[]
    }

    mat.forEach(food => {
        food.ekstra.forEach(pf => {
            preference_foods[pf].push(food.navn)
        })
    })

    let handlekurv = localStorage.getItem('handlekurv').split(",")
    console.log(handlekurv)
    if (handlekurv != null && handlekurv != "")
    {
        for (var i = 0; i < handlekurv.length; i+=2)
        {
            console.log(handlekurv[i])
            console.log(Number(handlekurv[i+1]))
            add(handlekurv[i])
            document.getElementById("antall_"+handlekurv[i]).value = Number(handlekurv[i+1])
            updateHandlekurv()
        }
    }

}


// Diplay: none alle retter som ikke er ønsket basert på checkboxes
function sort_allergies()

{

    let data = document.querySelectorAll(".preference:checked")

    if (data.length == 0)
    {
        // Resetter alle rettene til å være synlig
        var retter = document.getElementsByClassName("matretter")
        for (var i = 0; i < retter.length; i++)
        {
            document.getElementById(retter[i].id).style.display = 'block'
        }
    }
    else
    {
        // Resetter alle rettene til å være usynlig
        var retter = document.getElementsByClassName("matretter")
        for (var i = 0; i < retter.length; i++)
        {
            document.getElementById(retter[i].id).style.display = 'none'
        }
    }

    // console.log("data length: "+data.length)
    
    let preferences = []
    data.forEach(element => {
        preferences.push(element.id)
    })

    // console.log(preferences)
    
    preferences.forEach(element => {
        preference_foods[element].forEach(show_food => {
            document.getElementById(show_food).style.display = "block"
        })
    })

    // Henter ut alle allergen-boxer som er checked
    data = document.querySelectorAll(".allergy:checked")

    // Itererer over raw data, henter ut ids, og lagrer dem i en array
    let allergies = []
    data.forEach(element => {
        allergies.push(element.id)
    })

    
    // Iterer over alle rettene som inneholder allergener som er uønsket, og hider dem
    allergies.forEach(allergy => {
        allergy_foods[allergy].forEach(hide_food => {
            document.getElementById(hide_food).style.display = 'none'
        })
    })

}

function remove(id)
{
    document.getElementById("antall_"+id.split("_")[1]).value = 0
    updateHandlekurv()
}

function updateHandlekurv()
{
    // Check if you need to remove anything
    let raw_input_data = document.getElementsByClassName('order_antall')
    let subtotal = 0
    for(element of raw_input_data)
    {
        if (document.getElementById(element.id).value == 0)
        {
            document.getElementById(element.id.split("_")[1]+"_takeaway").remove()
        }
        else
        {
            mat.forEach(rett => {
                if (rett.navn == element.id.split("_")[1])
                {
                    subtotal += rett.pris * document.getElementById(element.id).value
                }
            })
        }
    }
    document.getElementById("span_pris").innerHTML = subtotal

    let input_data = []
    for (data of raw_input_data)
    {
        input_data.push(data.id.split("_")[1], data.value)
    }

    // console.log(raw_input_data)

    // console.log(input_data)

    localStorage.setItem('handlekurv', input_data)
}

// Legger til den ønskede retten i handlekurven
function add(id)
{
    console.log("adding " + id)

    if (document.getElementById(id.split("_")[0]+"_takeaway") == null)
    {

        let raw_input_data = []
        let inputs = document.getElementsByClassName('order_antall')
        for (let item of inputs)
        {
            let order_value = document.getElementById(item.id).value
            raw_input_data.push([item.id, order_value])
        }


        // Extrapolerer navnet til ønsket rett
        let name = id.split("_")[0]
        
        // Finner indexen til retten i mat-arrayen
        let item = 0
        for (var x = 0; x < mat.length; x++)
        {
            if (name == mat[x].navn)
            {
                item = x
            }
        }

        // Legger til retten i handlekurven
        document.getElementById("takeaway_handlekurv").innerHTML +=
        `<div id="`+mat[item].navn+`_takeaway" class="matretter">
            <span class="mat_tittel">`+mat[item].navn+`</span>
            &nbsp&nbsp
            <span class="mat_pris">`+mat[item].pris+`,-</span>
            <br>
            <span>Antall</span>
            <input type="number" min="0" value="1" class="order_antall" id="antall_`+mat[item].navn+`">
            <button class="remove_button" id="remove_`+mat[item].navn+`" onclick="remove(this.id)">Fjern alle</button>
        </div>`  

        for (value of raw_input_data)
        {
            document.getElementById(value[0]).value = Number(value[1])
        }


        inputs = document.getElementsByClassName('order_antall')
        for (element of inputs)
        {
            document.getElementById(element.id).addEventListener('input', updateHandlekurv)
        }
    }
    else
    {
        document.getElementById("antall_"+id.split("_")[0]).value = Number(document.getElementById("antall_"+id.split("_")[0]).value) + 1
    }

    updateHandlekurv()
}

function addButtonFunctionality()
{
    for (var x = 0; x < mat.length; x++)
    {
        document.getElementById(mat[x].navn+"_button").addEventListener('click', function(){add(this.id)})
    }
}

function completeOrder()
{
    let customer_name = prompt("Vennligst legg til telefonnummer eller navn")
    if ((customer_name.search(/[^A-Za-z\s]/) == -1 && customer_name.length > 0) || (isNaN(customer_name) == false && customer_name.length == 8))
    {
        alert("Takk for din bestilling.\nMaten din er klar til henting om 10-15 minutter")
        localStorage.setItem('handlekurv', "")
        location.reload()
    }
    else
    {
        alert("Vennligst skriv inn navnet, eller telefonnummeret ditt (8 tall)")
        completeOrder()
    }
}

function main()
{
    setup_meny()
}

main()