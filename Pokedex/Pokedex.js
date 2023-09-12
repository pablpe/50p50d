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
let body = document.querySelector("body");
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
                        data-gen= "${getGen(num)}" data-type= "${data.types[0].type.name}" data-genvisible= "1" data-typevisible= "1">
                        <div class="imgCardCont" style="border: solid 3px ${darkerColors[data.types[0].type.name]}; background-color: ${darkerColors[data.types[0].type.name]};">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png" alt="">
                        </div>
                        <div class="pokemonNbrCard">#${num}</div>
                        <div class="pokemonNameCard">${data.forms[0].name}</div>
                        <i class="fa-regular fa-heart"></i>
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
        divAct.addEventListener("mouseenter", ()=>{divAct.querySelector("img").style.scale = 1.6;})
        divAct.addEventListener("mouseleave", ()=>{divAct.querySelector("img").style.scale = 1.1;})
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
        
        if (card.getAttribute("data-genvisible") == 1 && card.getAttribute("data-typevisible") == 1) {
            let nbrAct = card.querySelector(".pokemonNameCard").textContent.toLowerCase(); // Convierte el contenido de texto a minúsculas
            if (!nbrAct.includes(str)) {
                card.style.display = "none";
            } else {
                card.style.display = "flex";
            }
        }
    });
});

//Menu
//Label for li
document.addEventListener("click",(event)=>{
    if (event.target.tagName === "LI") {
        let val = event.target.querySelector("input").checked;
        val == true? event.target.querySelector("input").checked = false : event.target.querySelector("input").checked = true
        event.target.querySelector("input").dispatchEvent(new Event("input"))
    }
    let card = event.target.closest(".card");
    //favoritos
    if (event.target.tagName == "I" && event.target.classList.contains("fa-heart")) {
        if (actualTeam.length < 6 || event.target.classList.contains("fa-solid")) {
            event.target.classList.toggle("fa-regular")
            event.target.classList.toggle("fa-solid")
            if (event.target.classList.contains("fa-solid")) {
                actualTeam.push(card.querySelector(".pokemonNbrCard").textContent.slice(1))
                addMiniCard(actualTeam[actualTeam.length - 1]);
            }else{
                actualTeam = actualTeam.filter(act => {return act !== card.querySelector(".pokemonNbrCard").textContent.slice(1)})
                teamMenu.querySelectorAll(".miniCard").forEach(miniCard => {
                    if (miniCard.getAttribute("data-number") == card.querySelector(".pokemonNbrCard").textContent.slice(1)) {
                        miniCard.remove()
                    }
                })
            }
        }
    }else{
        if (card) addBigCard(card.querySelector(".pokemonNbrCard").textContent.slice(1))
    }
})
//Generation selection
// Generation selection
let gensCheckbx = document.getElementById("gensCheckbx");
let arrCheckbox = gensCheckbx.querySelectorAll("input");

function updateVisibility() {
    arrCheckbox.forEach((checkbox, index) => {
        let inp = index + 1;
        cards.forEach((card) => {
            if (card.getAttribute("data-gen") == inp) {
                if (checkbox.checked) {
                    card.setAttribute("data-genvisible", "1");
                    if (card.getAttribute("data-typevisible") == 1){
                        card.style.display = "flex";
                        search.value = "";
                    }
                } else {
                    card.setAttribute("data-genvisible", "0");
                    card.style.display = "none";
                    search.value = "";
                }
            }
        });
    });
}

arrCheckbox.forEach((checkbox, index) => {
    checkbox.addEventListener("input", () => {
        if (index === 8) {
            arrCheckbox.forEach((chx, i) => {
                if (i !== 8) {
                    chx.checked = checkbox.checked;
                }
            });
        }
        updateVisibility();
    });
});
document.addEventListener("DOMContentLoaded", updateVisibility)

//Type Selection
let typesCheckbx = document.getElementById("typesCheckbx");
let arrTypesCheckbox = typesCheckbx.querySelectorAll("input");

arrTypesCheckbox.forEach((checkbox, index) => {
    checkbox.addEventListener("input", () => {
        if (index === 20) {
            arrTypesCheckbox.forEach((chx, i) => {
                if (i !== 20) {
                    chx.checked = checkbox.checked;
                }
            });
        }
        updateTypeVisibility();
    });
});

function updateTypeVisibility() {
    arrTypesCheckbox.forEach((checkbox) => {
        let typ = checkbox.parentElement.textContent.trim();
        cards.forEach((card) => {
            if (card.getAttribute("data-type") === typ) {
                if (checkbox.checked) {
                    card.setAttribute("data-typevisible", "1");
                    if (card.getAttribute("data-genvisible") == 1){
                        card.style.display = "flex";
                        search.value = "";
                    }
                } else {
                    card.setAttribute("data-typevisible", "0");
                    card.style.display = "none";
                    search.value = "";
                }
            }
        });
    });
}

//big card
// cards.forEach(card =>{
//     card.addEventListener("click", addBigCard(card.querySelector(".pokemonNbrCard").textContent[1]))
// })
function getTypes(data){
    let typs = []
    data.types.forEach(type => typs.push(type.type.name))
    return typs
}
async function addBigCard(num){
    let data = await getData(num);
    statsTypes(data);
    let cardAct = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png" alt=""
                            id="imgBigCard">
                        <div id="bigCardCont" style="background-color: ${colors[data.types[0].type.name]}; box-shadow: 0 0 100px ${colors[data.types[0].type.name]};">
                            <h1 style= "font-size: 4rem">${data.forms[0].name}</h1>
                            <div>#${num}</div>
                            <div>Type/s : ${getTypes(data)}</div>
                            <div id="movesContainer">
                                <div id="titleMoves">Moves</div>
                                <div id="moves">
                                    ${getMoves(data.moves)}
                                </div>
                            </div>
                        </div>`;
    let divAct = document.createElement("div")
    divAct.id = "bigCard"
    divAct.innerHTML = cardAct;
    body.append(divAct)
}
async function statsTypes(data){
    let typesAct = [];
    let doubleDamageFrom = []
    let doubleDamageTo = []
    let halfDamageFrom = []
    let halfDamageTo = []
    let noDamageFrom = []
    let noDamageTo = []
    data.types.forEach(type => typesAct.push(type.type.name))
    typesAct.forEach(async function(type){
        let res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        let data = await res.json()
        data = data.damage_relations
        data.double_damage_from.forEach(type => { if (!doubleDamageFrom.includes(type.name)) doubleDamageFrom.push(type.name) });
        data.double_damage_to.forEach(type => { if (!doubleDamageTo.includes(type.name)) doubleDamageTo.push(type.name) });
        data.half_damage_from.forEach(type => { if (!halfDamageFrom.includes(type.name)) halfDamageFrom.push(type.name) });
        data.half_damage_to.forEach(type => { if (!halfDamageTo.includes(type.name)) halfDamageTo.push(type.name) });
        data.no_damage_from.forEach(type => { if (!noDamageFrom.includes(type.name)) noDamageFrom.push(type.name) });
        data.no_damage_to.forEach(type => { if (!noDamageTo.includes(type.name)) noDamageTo.push(type.name) });
})
    console.log("doubleDamageFrom:", doubleDamageFrom);
    console.log("doubleDamageTo:", doubleDamageTo);
    console.log("halfDamageFrom:", halfDamageFrom);
    console.log("halfDamageTo:", halfDamageTo);
    console.log("noDamageFrom:", noDamageFrom);
    console.log("noDamageTo:", noDamageTo);
}
document.addEventListener("click", function(event) {
    var bigCard = document.getElementById("bigCard");
    var bigCardCont = document.getElementById("bigCardCont");

    if (bigCard && !bigCardCont.contains(event.target)) {
        bigCard.remove();
    }
});

function getMoves(data){
    let content = "";
    data.forEach((movement) =>{
        content += `<div class="move">${movement.move.name}</div>`;
    })
    return content
}

let formatbtn = document.getElementById("format");
formatbtn.addEventListener("click", ()=>{
    container.classList.toggle("list");
    cards.forEach((card) =>{
        card.classList.toggle("list");
    })
})

//TEAM IN HOMESCREEN
let btnDeck = document.getElementById("btnDeck")
let teamMenu = document.getElementById("teamMenu")
let actualTeam = [];

btnDeck.addEventListener("click", ()=>{
    btnDeck.classList.toggle("active")
    teamMenu.classList.toggle("active")
})

teamMenu.addEventListener("click", (event)=>{
    if (window.getComputedStyle(teamMenu).display == "flex") {
        if (event.target.tagName == "I") {
            let number = event.target.closest(".miniCard").getAttribute("data-number")
            event.target.closest(".miniCard").remove()
            actualTeam = actualTeam.filter(act => {return act !== number})
            cards.forEach(card => { 
                if (card.querySelector(".pokemonNbrCard").textContent.slice(1) == number) {
                    card.querySelector("I").classList.toggle("fa-regular")
                    card.querySelector("I").classList.toggle("fa-solid")
                }
            })
        }
    }
})

async function addMiniCard(name) {
    let data = await getData(name)
    let minicardCont = `<div class="miniCard" data-number="${data.id}">
                            <i class="fa-solid fa-xmark" style="color: #f70202;"></i>
                            <h2>${data.forms[0].name}</h2>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="">
                        </div>`;
    teamMenu.innerHTML += minicardCont;
}