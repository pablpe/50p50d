    var colors = {
    "normal": "rgb(217, 203, 186)",
    "fighting": "rgb(243, 213, 188)",
    "flying": "rgb(192, 218, 229)",
    "poison": "rgb(191, 192, 219)",
    "ground": "rgb(229, 203, 160)",
    "rock": "rgb(207, 204, 192)",
    "bug": "rgb(201, 215, 178)",
    "ghost": "rgb(198, 176, 212)",
    "steel": "rgb(194, 195, 204)",
    "fire": "rgb(250, 171, 147)",
    "water": "rgb(173, 216, 230)",
    "grass": "rgb(189, 232, 182)",
    "electric": "rgb(248, 217, 186)",
    "psychic": "rgb(226, 185, 193)",
    "ice": "rgb(202, 230, 240)",
    "dragon": "rgb(232, 191, 130)",
    "dark": "rgb(186, 176, 168)",
    "fairy": "rgb(244, 204, 226)",
    "unknown": "rgb(160, 160, 160)",
    "shadow": "rgb(85, 85, 85)"
  };
  var darkerColors = {
    "normal": "rgb(120, 110, 95)",
    "fighting": "rgb(150, 120, 100)",
    "flying": "rgb(100, 130, 140)",
    "poison": "rgb(95, 96, 110)",
    "ground": "rgb(140, 110, 70)",
    "rock": "rgb(110, 106, 95)",
    "bug": "rgb(100, 115, 85)",
    "ghost": "rgb(85, 70, 95)",
    "steel": "rgb(80, 81, 90)",
    "fire": "rgb(180, 90, 70)",
    "water": "rgb(70, 110, 120)",
    "grass": "rgb(85, 120, 85)",
    "electric": "rgb(140, 100, 70)",
    "psychic": "rgb(120, 80, 90)",
    "ice": "rgb(100, 120, 130)",
    "dragon": "rgb(120, 80, 50)",
    "dark": "rgb(90, 80, 70)",
    "fairy": "rgb(150, 110, 130)",
    "unknown": "rgb(70, 70, 70)",
    "shadow": "rgb(40, 40, 40)"
};


const srcImgs = "https://pokeres.bastionbot.org/images/pokemon/"; //n.png
let container = document.getElementById("container");
let btnMenu = document.getElementById("btnMenu");
let menu = document.getElementById("menu")
let menuThings = menu.querySelectorAll("*");
let menuActive = false
let cards
menuThings.forEach((thing)=>{
    thing.style.opacity = 0;
})
btnMenu.addEventListener("click", ()=>{
    if (menuActive) {
        menu.style.width = "0vw";
        container.style.width = "100vw";
        container.style.left = "0";
        menuThings.forEach((thing)=>{
            thing.style.opacity = 0;
        })
        menuActive = false;
    }else{
        menu.style.width = "20vw";
        container.style.width = "80vw";
        container.style.left = "20vw";
        menuThings.forEach((thing)=>{
            thing.style.opacity = 1;
        })
        menuActive = true;
    }
})
async function getData(num){
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    let data = await res.json()
    return data;
}
async function newCard(num){
    let data = await getData(num);
    let element = `<div class="card" style="background-color: ${colors[data.types[0].type.name]}; box-shadow: 0 0 100px ${colors[data.types[0].type.name]};"
                        data-gen= "${getGen(num)}" data-type= "${data.types[0].type.name}">
                        <div class="imgCardCont" style="border: solid 3px ${darkerColors[data.types[0].type.name]};">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png" alt="">
                        </div>
                        <div class="pokemonNbrCard">#${num}</div>
                        <div class="pokemonNameCard">${data.forms[0].name}</div>
                    </div>`;
    return element
}
function getGen(num){
    if (num <= 151) return 1;
    else if (num <= 251) return 2;
    else if (num <= 386) return 3;
    else if (num <= 493) return 4;
    else if (num <= 649) return 5;
    else if (num <= 721) return 6;
    else if (num <= 807) return 7;
    else if (num <= 905) return 8;
}

async function addCards(nums){
    for (let i = 1; i <= nums; i++) {
        let divAct = document.createElement("div")
        divAct.innerHTML = await newCard(i)
        divAct.addEventListener("mouseenter", ()=>{divAct.querySelector("img").style.scale = 2;})
        divAct.addEventListener("mouseleave", ()=>{divAct.querySelector("img").style.scale = 1.7;})
        container.appendChild(divAct)
    }
    cards = container.querySelectorAll(".card")
}
addCards(905)

// Search
let search = document.getElementById("search");
search.addEventListener("input", () => {
    let str = search.value.toLowerCase(); // Convierte la entrada de búsqueda a minúsculas
    cards.forEach((card) => {
        let nbrAct = card.querySelector(".pokemonNameCard").textContent.toLowerCase(); // Convierte el contenido de texto a minúsculas
        if (!nbrAct.includes(str)) {
            card.style.display = "none";
        } else {
            card.style.display = "flex";
        }
    });
});

//Menu
//Generation selection
let gensCheckbx = document.getElementById("gensCheckbx")
let arrCheckbox = gensCheckbx.querySelectorAll("input")
arrCheckbox.forEach((checkbox, index) => {
    checkbox.addEventListener("input", () => {
        if (index == 8) {
            arrCheckbox.forEach((chx, i) => {
                if (i != 8) {
                    if (checkbox.checked) {
                        chx.checked = true;
                        changeVisibilityGen(chx,i)
                    } else {
                        chx.checked = false;
                        changeVisibilityGen(chx,i)
                    }
                }
            });
        } else {
            changeVisibilityGen(checkbox, index)
        }
    });
});
function changeVisibilityGen(checkbox, index){
    let inp = index + 1;
            if (checkbox.checked) {
                cards.forEach((card) => {
                    if (card.getAttribute("data-gen") == inp) {
                        card.style.display = "flex";
                    }
                });
            } else {
                cards.forEach((card) => {
                    if (card.getAttribute("data-gen") == inp) {
                        card.style.display = "none";
                    }
                });
            }
}