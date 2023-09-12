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





async function getData(num){
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    let data = await res.json()
    return data;
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