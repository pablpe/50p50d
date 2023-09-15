
/////Menu desplegable
let imgMenu = document.querySelector(".imagen-menu-desplegable");
let menuDesplegable = document.querySelector(".menu-desplegable");

imgMenu.addEventListener("click",()=>{
    menuDesplegable.classList.add("despliegue-menu");
});
document.addEventListener("click", (e) => {
    if (
        menuDesplegable.classList.contains("despliegue-menu") &&
        !menuDesplegable.contains(e.target) &&
        !imgMenu.contains(e.target)
    ) {
        menuDesplegable.classList.remove("despliegue-menu");
    }
    if(e.target.tagName === "A" && e.target.closest(".menu-desplegable")){
        menuDesplegable.classList.remove("despliegue-menu");
    }
});
/////Colores complementarios
let root = document.documentElement.style;

//root.setProperty("--color1-gradiente","red");
let numeroColores = document.getElementById("numeroColores");

let picker = document.querySelector("#pickerComplementarios");
picker.addEventListener("input",()=>{
    root.setProperty("--color1-gradiente",picker.value);
    root.setProperty("--color2-gradiente",colorComplementario(picker.value));
    numeroColores.innerText = `Color izquierda : ${picker.value}
                                Color derecha: ${colorComplementario(picker.value)}`;
});

function colorComplementario(hexColor){
    
    hexColor = hexColor.replace("#", "");

        
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    
    const rComplementario = 255 - r;
    const gComplementario = 255 - g;
    const bComplementario = 255 - b;

    return `rgb(${rComplementario},${gComplementario},${bComplementario})`;
}

/////Hover radial
const contenedorElementos = document.querySelector(".seccion-hoverRadial");

contenedorElementos.addEventListener("mousemove", (e) => {
  if (e.target.classList.contains("elemento-hover-radial")) {
    let rect = e.target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;
    root.setProperty("--x-gradienteR",`${offsetX}px`);
    root.setProperty("--y-gradienteR",`${offsetY}px`);
  }
});
/* --x-gradienteR :0;
    --y-gradienteY : 0; */

/////Transiciones
let botonTransicion = document.getElementById("botonTransicion");
let elementoTransicion = document.querySelector(".elementoTransicion");
botonTransicion.addEventListener("click",()=>{
    if(!elementoTransicion.classList.contains("aparece")){
        elementoTransicion.classList.add("aparece");
    }else{
        elementoTransicion.classList.remove("aparece");
    }
});

/////Expanding cards
let expandingCards = document.getElementById("expandingCards");
expandingCards.addEventListener("mouseover",(e)=>{
    if(e.target.classList.contains("imgExp")){
        e.target.classList.add("expandirImg");
    }
});
let imagenes = expandingCards.querySelectorAll(".imgExp");

for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("mouseout",()=>{
        imagenes[i].classList.remove("expandirImg");
    });
}
/////Progress steps
let pasos = document.querySelectorAll(".paso");
let btnNext = document.getElementById("btnAvanzar");
let btnPrev = document.getElementById("btnRetroceder");
let barraProgreso1 = document.querySelector(".barraProgreso1");
let progresoContenedor = document.querySelector(".progreso");
let posActual = 0;
let posMinima = 0;
let posMaxima = pasos.length-1;
let pctgMovimiento;

btnNext.addEventListener("click",()=>{
    pctgMovimiento = parseInt(window.getComputedStyle(progresoContenedor).width)/(pasos.length-1) //lo pongo aqui para que se actualice cada vez que cambia el width de la pantalla
    posActual++;
    if(posActual == 1){
        btnPrev.disabled = false;
    }
    if(posActual == posMaxima){
        btnNext.disabled = true;
    }
    barraProgreso1.style.width = `${pctgMovimiento*posActual}px`;
    pasos[posActual].classList.add("activo");
});
btnPrev.addEventListener("click",()=>{
    pctgMovimiento = parseInt(window.getComputedStyle(progresoContenedor).width)/(pasos.length-1)
    posActual--;
    if(posActual == posMaxima-1){
        btnNext.disabled = false;
    }
    if(posActual == 0){
        btnPrev.disabled = true;
        barraProgreso1.style.width = 0;
    }
    barraProgreso1.style.width = `${pctgMovimiento*posActual}px`;
    pasos[posActual+1].classList.remove("activo");
});


/////Rotating navigation
let circuloMenu = document.querySelector(".circuloMenu");
let fondo1 = document.querySelector(".fondo1");
let menuEscondido = document.querySelector(".menuEscondido");

circuloMenu.addEventListener("click",()=>{
    if(!circuloMenu.classList.contains("circuloRotar")){
        circuloMenu.classList.add("circuloRotar");
        fondo1.classList.add("fondoRotar");
        menuEscondido.classList.remove("esconderMenu");
    }else{
        circuloMenu.classList.remove("circuloRotar");
        fondo1.classList.remove("fondoRotar");
        menuEscondido.classList.add("esconderMenu");
    }
});
/////Hidden search widget
let botonHiddenSearch = document.getElementById("botonHiddenSearch");
let searchWidget = document.querySelector(".searchWidget");

botonHiddenSearch.addEventListener("click",()=>{
    if(searchWidget.classList.contains("searchWidgetEscondido")){
        searchWidget.classList.remove("searchWidgetEscondido");
    }
});
/////Loading img
let textoImg = document.getElementById("textoImg");
let bgImg = document.querySelector(".bgImg");
let recargaImg = document.getElementById("recargaImg");

let numAct = 0;
let intImg;

recargaImg.addEventListener("click", () => {
    recargaImg.style.opacity = 0;
    intImg = setInterval(desvanece, 30);
});

function desvanece() {
    numAct++;
    textoImg.innerText = `${numAct}%`;
    textoImg.style.opacity = scale(numAct, 0, 100, 1, 0);
    bgImg.style.filter = `blur(${scale(numAct, 0, 100, 30, 0)}px)`;
    if (numAct > 99) {
        clearInterval(intImg);
    }
}

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

///// Scroll animations

let observer = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add("visibleScroll");
        } else {
            entry.target.classList.remove("visibleScroll");
        }
    });
});

let contenidosScroll = document.querySelectorAll(".contenidoScroll");
contenidosScroll.forEach(el => observer.observe(el));

let contenidoScrollAnimations = document.getElementById("contenidoScrollAnimations");

contenidoScrollAnimations.addEventListener("mouseover",(e)=>{
    if(e.target.classList.contains("contenidoScroll")){
        e.target.classList.add("enhover");
    }
});
contenidoScrollAnimations.addEventListener("mouseout",(e)=>{
    if(e.target.classList.contains("contenidoScroll")){
        e.target.classList.remove("enhover");
    }
});

///// Hidden sections

let botonesHidden = document.getElementById("botonesHidden");
let botones = document.querySelectorAll(".botonHidden");
let textos = document.getElementById("textosHidden").querySelectorAll("p");
botonesHidden.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.classList.contains("botonHidden") && !target.classList.contains("botonSeleccionado")){
        botones.forEach(boton =>{
            boton.classList.remove("botonSeleccionado");
        });
        target.classList.add("botonSeleccionado");
        textos.forEach(texto =>{
            if(texto.getAttribute("data-id") == target.getAttribute("data-id")){
                texto.style.display = "block";
            }else{
                texto.style.display = "none";
            }
        });
    }
});

///// Wave Form

let titulosInput = document.querySelectorAll(".tituloInput");
titulosInput.forEach(titulo =>{
    let texto = titulo.innerText;
    let nuevoHTML = '';
    for (let i = 0; i < texto.length; i++) {
        nuevoHTML += `<span>${texto[i]}</span>`;
    }
    titulo.innerHTML = nuevoHTML;
});
titulosInput.forEach(element => {
    element.addEventListener("click",(e)=>{
        titulosInput.forEach(titulo =>{
            let letraCh = titulo.children;
            for (let i = 0; i < letraCh.length; i++) {
                setTimeout(() => {
                    letraCh[i].classList.remove("letraActiva");
                }, i * 50);
            }
        });
        let letraCh = e.target.closest(".tituloInput").children;
        for (let i = 0; i < letraCh.length; i++) {
            setTimeout(() => {
                letraCh[i].classList.add("letraActiva");
            }, i * 50);
        }
        e.target.closest(".inpYNombre").querySelector("input").focus();
    });
});

///// Dad jokes
let buttonJokes = document.querySelector(".newJoke");
let fraseAct = document.getElementById("fraseAct");


buttonJokes.addEventListener("mousedown",()=>{
    buttonJokes.classList.add("botonPulsadoJK");
    dadApi();
});
buttonJokes.addEventListener("mouseup",()=>{
    buttonJokes.classList.remove("botonPulsadoJK");
});
async function dadApi(){
    let fetchD = await fetch("https://icanhazdadjoke.com",{
        headers: {
            Accept : "application/json",
        },
    });
    let respD = await fetchD.json();
    fraseAct.innerText = respD.joke;
}
dadApi();

/////eventKeyCodes

let key = document.getElementById("key");
let keyCode = document.getElementById("keyCode");
let code = document.getElementById("code");

document.addEventListener("keydown",(e)=>{
    contenedorKeys.querySelector(".infoKey").innerText = e.key;
    keyCode.querySelector(".infoKey").innerText = e.keyCode;
    code.querySelector(".infoKey").innerText = e.code;
});
///// FAQs
let FAQsContenedor = document.getElementById("FAQs");
let FAQs = document.querySelectorAll(".FAQ");
FAQsContenedor.addEventListener("click",(e)=>{
    if(e.target.closest(".FAQ")){
        console.log("a");
        FAQs.forEach(faq =>{
            faq.classList.remove("FAQactivo");
            faq.querySelector("button").innerHTML = '<i class="fa-regular fa-lightbulb" style="color: #246ef0;"></i>';
        });
        e.target.closest(".FAQ").classList.add("FAQactivo");
        e.target.closest(".FAQ").querySelector("button").innerHTML = '<i class="fa-solid fa-xmark" style="color: #e43f3f;"></i>';
    }else{
        FAQs.forEach(faq =>{
            faq.classList.remove("FAQactivo");
            faq.querySelector("button").innerHTML = '<i class="fa-regular fa-lightbulb" style="color: #246ef0;"></i>';
        });
    }
});

/////Random choice picker

let inputOpciones = document.getElementById("inputOpciones");
let contenedorOpciones = document.getElementById("contenedorOpciones");

inputOpciones.addEventListener("input",()=>{
    contenedorOpciones.innerHTML = "";
    let opcionesArrTexto = inputOpciones.value.split(",");
    opcionesArrTexto.forEach(opcion =>{
        let div = document.createElement("div");
        div.innerText = opcion;
        div.classList.add("opcionRndP");
        contenedorOpciones.appendChild(div);
    });
});
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
inputOpciones.addEventListener("keydown",async (e)=>{
    let opcionesActuales = document.querySelectorAll(".opcionRndP");
    for (let i = 0; i < opcionesActuales.length; i++) {
        await esperar(50);
        for (let i = 0; i < opcionesActuales.length; i++) {
            opcionesActuales[i].style.backgroundColor = "rgb(255, 178, 36)";
        }
        opcionesActuales[Math.floor(Math.random() * opcionesActuales.length)].style.backgroundColor = "darkblue";
    }
});

///// Drink Water
let vasos = document.querySelectorAll(".vasoPeq");
let vasoGrande = document.getElementById("vasoGrande");
let parteLlena = document.getElementById("parteLlena");
let parteVacia = document.getElementById("parteVacia");

vasos.forEach((vaso,i)=>{
    vaso.addEventListener("click",async ()=>{
        vasos.forEach(vas =>{vas.classList.remove("llenaVPeq")});
        for (let j = 0; j <= i; j++) {
            await esperar(100);
            vasos[j].classList.add("llenaVPeq");
        }
        parteLlena.style.height = "0%";
        //parteVacia.style.height = "100%";
        let pctg = 0;
        let pctgObj = 100 * (((i+1)*1)/8);
        console.log(pctgObj);
        let int = setInterval(() => {
            pctg++;
            //console.log(pctg);
            parteLlena.style.height = `${scale(pctg,0,100,0,pctgObj)}%`;
            parteLlena.innerText = `${scale(pctg,0,100,0,pctgObj)}%`;
            if(pctg == 100){
                clearInterval(int);
            }
        }, 10);
    });
});

// peliculas
// clave de la api : 10dd0b892ea7a71f546d6a9ae244419b
// token de acceso de lectura a la api : eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzA3MmVlZTEwYWY5OTgzY2YxYThmZDBhMzY5M2QzMSIsInN1YiI6IjY0Y2EzZjE1MGI3NGU5MDBhYzY2Yjc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oEVk-yhG82vAhrAuxAS2UGNU-DP_Y0uUl33MAFyJR4I

// async function testeo(){
//     const options = {method: 'GET', headers: {accept: 'application/json'}};
//     let resp = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&api_key=10dd0b892ea7a71f546d6a9ae244419b&page=1', options);
//     let data = await resp.json();
//     console.log(data);
// }
// testeo();

// animatedNavigation

let botonMenu = document.getElementById("botonMenu");
let elmsMenu = document.getElementById("elmsMenu");

botonMenu.addEventListener("click",()=>{
    botonMenu.classList.toggle("botonMPulsado");
    elmsMenu.classList.toggle("botonMPulsadoElm");
});


/////Clock

let agujaH = document.getElementById("agujaH");
let agujaM = document.getElementById("agujaM");
let agujaS = document.getElementById("agujaS");
let hora = document.getElementById("hora");
let fecha = document.getElementById("fecha");
let lightBulb = document.getElementById("lightBulb");
let bulbPulsado = false;
lightBulb.addEventListener("click",()=>{
    if(!bulbPulsado){
        bulbPulsado = true;
        root.setProperty("--color-principal","black");
        root.setProperty("--color-secundario","white");
    }else{
        bulbPulsado = false;
        root.setProperty("--color-principal","white");
        root.setProperty("--color-secundario","black");
    }
});

setInterval(() => {
    let date = new Date();
    //console.log(Date());
    agujaH.style.transform = `rotate(${scale(date.getHours(),0,23,0,360)-90}deg) translateY(-50%)`;
    agujaM.style.transform = `rotate(${scale(date.getMinutes(),0,59,0,360)-90}deg) translateY(-50%)`;
    agujaS.style.transform = `rotate(${scale(date.getSeconds(),0,59,0,360)-90}deg) translateY(-50%)`;
    hora.innerText = `${date.getHours()>12?date.getHours()-12 : date.getHours()}:${date.getMinutes()} ${date.getHours()>12? "PM" : "AM"}`;
    //fecha.innerText = date.getDate();
}, 1000);

/////buttonRipple

let botonRipple = document.getElementById("botonRipple");

botonRipple.addEventListener("click",function(e){
    let ejeX = e.offsetX;
    let ejeY = e.offsetY;
    console.log(ejeX,ejeY);
    let div = document.createElement("div");
    div.classList.add("circuloRipple");
    div.style.left = `${ejeX}px`;
    div.style.top = `${ejeY}px`;
    botonRipple.appendChild(div);
    setTimeout(() => {
        botonRipple.removeChild(div)
    }, 600);
});

///// Drag and drop
let draggable = document.getElementById("draggable");
let a = draggable.closest(".contenido-seccion");
draggable.addEventListener("dragstart",(e1)=>{
    
});