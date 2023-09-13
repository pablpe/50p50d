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
let myPokemons = document.getElementById("myPokemons")
let team = JSON.parse(localStorage.getItem("actualTeam"))
let myCurrentPokemon = document.getElementById("myCurrentPokemon")
let miniCards
addMyPokemons(team)

//ADD MYPOKEMONS
async function addMyPokemons(team) {
    await Promise.all(team.map(async function(pokemon) {
        let data = await getData(pokemon);
        let content = `<div class="miniCard" style="background-color: ${colors[data.types[0].type.name]};" data-number= ${pokemon}>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png" style="scale: 1.4; transform: translateY(-20%);">
                            <div id="typesMC">${divsTypes(data)}</div>
                            <h3>${data.forms[0].name}</h3>
                        </div>`;
        myPokemons.innerHTML += content;
    }));
    onChargeActions();
}

// Resto del código...

function divsTypes(data){
    let content = "";
    data.types.forEach(t =>{
        content += `<div style="background-color: ${darkerColors[t.type.name]}; color: ${colors[t.type.name]}; padding: 3px 6px; width: fit-content; border-radius: 20px;">
                        ${t.type.name}
                    </div>`
    })
    return content
}
function onChargeActions(){
    miniCards = document.querySelectorAll(".miniCard")
    miniCards.forEach(card =>{
        card.addEventListener("mouseenter", ()=>{
            card.style.boxShadow = `0 0 10px ${window.getComputedStyle(card).backgroundColor}`
        })
        card.addEventListener("mouseleave", ()=>{
            card.style.boxShadow = ""
        })
        card.addEventListener("click", ()=>{updateCurrent(card.getAttribute("data-number"), myCurrentPokemon)})
    })
}
//ADD MYPOKEMONS
//ADD CURRENT POKEMON
async function updateCurrent(num, container){
    container.innerHTML = "";
    let data = await getData(num);

    let typesAct = [];
    let doubleDamageFrom = []
    let doubleDamageTo = []
    let halfDamageFrom = []
    let halfDamageTo = []
    let noDamageFrom = []
    let noDamageTo = []

    data.types.forEach(type => typesAct.push(type.type.name));

    const typePromises = typesAct.map(async function(type) {
        let res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        let data = await res.json();
        data = data.damage_relations;
        data.double_damage_from.forEach(type => { if (!doubleDamageFrom.includes(type.name)) doubleDamageFrom.push(type.name) });
        data.double_damage_to.forEach(type => { if (!doubleDamageTo.includes(type.name)) doubleDamageTo.push(type.name) });
        data.half_damage_from.forEach(type => { if (!halfDamageFrom.includes(type.name)) halfDamageFrom.push(type.name) });
        data.half_damage_to.forEach(type => { if (!halfDamageTo.includes(type.name)) halfDamageTo.push(type.name) });
        data.no_damage_from.forEach(type => { if (!noDamageFrom.includes(type.name)) noDamageFrom.push(type.name) });
        data.no_damage_to.forEach(type => { if (!noDamageTo.includes(type.name)) noDamageTo.push(type.name) });
    });
    await Promise.all(typePromises);
    container.innerHTML = `<div class="myCurrPkmn" style="background-color: ${colors[data.types[0].type.name]};">
                                        <div id="name">${data.forms[0].name}</div>
                                        <div id="imgNTypes">
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="">
                                            <div id="typesMC">${divsTypes(data)}</div>
                                        </div>
                                        <div id="typeStats">
                                            <div class="statContainer">
                                                <div style="display: flex; align-items: center; justify-content: center; height: 10%; background-color: violet; font-size: 0.8rem;
                                                    padding: 0.2rem; box-sizing: border-box; text-align: center;">
                                                    Double damage from
                                                </div>
                                                <div class="stat">${getstatTypes(doubleDamageFrom)}</div>
                                            </div>
                                            <div class="statContainer">
                                                <div style="display: flex; align-items: center; justify-content: center; height: 10%; background-color: violet; font-size: 0.8rem;
                                                    padding: 0.2rem; box-sizing: border-box; text-align: center;">
                                                    Double damage to
                                                </div>
                                                <div class="stat">${getstatTypes(doubleDamageTo)}</div>
                                            </div>
                                            <div class="statContainer">
                                                <div style="display: flex; align-items: center; justify-content: center; height: 10%; background-color: violet; font-size: 0.8rem;
                                                    padding: 0.2rem; box-sizing: border-box; text-align: center;">
                                                    Half damage from
                                                </div>
                                                <div class="stat">${getstatTypes(halfDamageFrom)}</div>
                                            </div>
                                            <div class="statContainer">
                                                <div style="display: flex; align-items: center; justify-content: center; height: 10%; background-color: violet; font-size: 0.8rem;
                                                    padding: 0.2rem; box-sizing: border-box; text-align: center;">
                                                    Half damage to
                                                </div>
                                                <div class="stat">${getstatTypes(halfDamageTo)}</div>
                                            </div>
                                            <div class="statContainer">
                                                <div style="display: flex; align-items: center; justify-content: center; height: 10%; background-color: violet; font-size: 0.8rem;
                                                    padding: 0.2rem; box-sizing: border-box; text-align: center;">
                                                    No damage from
                                                </div>
                                                <div class="stat">${getstatTypes(noDamageFrom)}</div>
                                            </div>
                                            <div class="statContainer">
                                                <div style="display: flex; align-items: center; justify-content: center; height: 10%; background-color: violet; font-size: 0.8rem;
                                                    padding: 0.2rem; box-sizing: border-box; text-align: center;">
                                                    No damage to
                                                </div>
                                                <div class="stat">${getstatTypes(noDamageTo)}</div>
                                            </div>
                                        </div>
                                    </div>`;
}
function getstatTypes(arr){
    let cont = ""
    arr.forEach(elm =>{
        cont += `<div class="statType">${elm}</div>`
    })
    return cont
}
//ADD CURRENT POKEMON
async function getData(num){
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    let data = await res.json()
    return data;
}
// async function statsTypes(data){
//     let typesAct = [];
//     let doubleDamageFrom = []
//     let doubleDamageTo = []
//     let halfDamageFrom = []
//     let halfDamageTo = []
//     let noDamageFrom = []
//     let noDamageTo = []
//     data.types.forEach(type => typesAct.push(type.type.name))
//     typesAct.forEach(async function(type){
//         let res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
//         let data = await res.json()
//         data = data.damage_relations
//         data.double_damage_from.forEach(type => { if (!doubleDamageFrom.includes(type.name)) doubleDamageFrom.push(type.name) });
//         data.double_damage_to.forEach(type => { if (!doubleDamageTo.includes(type.name)) doubleDamageTo.push(type.name) });
//         data.half_damage_from.forEach(type => { if (!halfDamageFrom.includes(type.name)) halfDamageFrom.push(type.name) });
//         data.half_damage_to.forEach(type => { if (!halfDamageTo.includes(type.name)) halfDamageTo.push(type.name) });
//         data.no_damage_from.forEach(type => { if (!noDamageFrom.includes(type.name)) noDamageFrom.push(type.name) });
//         data.no_damage_to.forEach(type => { if (!noDamageTo.includes(type.name)) noDamageTo.push(type.name) });
//     })
// }
//SEARCH
let search = document.getElementById("search")
let results = document.getElementById("results")
let pokemonNames = JSON.parse(localStorage.getItem("pokemonNames"))
let opponent = document.getElementById("opponent")

document.addEventListener("click", (event)=>{
    if(event.target == search) results.classList.remove("hidden")
    else results.classList.add("hidden")
})
search.addEventListener("input", ()=>{
    results.innerHTML = "";
    pokemonNames.forEach(name =>{
        if (name.includes(search.value)) {
            results.innerHTML += `<div class="result">${name}</div>`;
        }
    })
})
document.addEventListener("click", (event)=>{
    if (event.target.classList.contains("result")) {
        updateCurrent(event.target.textContent, opponent)
    }
});
//SEARCH