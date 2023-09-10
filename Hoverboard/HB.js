let cuadraditos = document.querySelectorAll(".cuadradito");
let container = document.getElementById("container");

let rows = 22;// 22 22
let cols = 22;
for (let i = 0; i < rows*cols; i++) {
    let cuadradito = document.createElement("div");
    cuadradito.classList.add("cuadradito");
    cuadradito.addEventListener("mouseenter",()=>{
        let colorAct = getRColor();
        cuadradito.style.backgroundColor = colorAct;
        cuadradito.style.boxShadow = `0 0 10px 2px ${colorAct}`;
    })
    cuadradito.addEventListener("mouseleave",()=>{
        cuadradito.style.backgroundColor = "rgba(128, 128, 128, 0.346)";
        cuadradito.style.boxShadow = "0 0 0px";
    })
    container.appendChild(cuadradito);
}
function getRColor(){
    let arrRGB = []
    
    for (let i = 0; i < 3; i++) {
        arrRGB.push(Math.floor(Math.random() * (255 - 100 + 1)) + 100);
    }
    return (`rgb(${arrRGB[0]},${arrRGB[1]},${arrRGB[2]})`)
}

//segundos

let segundos = document.getElementById("segundos");
segundos.addEventListener("input",()=>{
    document.documentElement.style.setProperty('--transitionD', `${segundos.value}s`);
})