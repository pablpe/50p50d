let titulos = document.getElementById("titulos");
let arrtitulos = titulos.querySelectorAll("div");

let fotos = document.getElementById("fotos");
let arrfotos = fotos.querySelectorAll("div");

let size = arrtitulos.length;
let arrDown = document.getElementById("arrDown");
let arrUp = document.getElementById("arrUp");

arrfotos.forEach((foto)=>{
    foto.style.transform = `translateY(${(size-1) * -100}%)`;
});

let index = 0;

arrDown.addEventListener("click", () => {
  index++;
  if (index === size) {
    index = 0;
  }

  updateTransforms();
});

arrUp.addEventListener("click", () => {
  index--;
  if (index === -1) {
    index = size - 1;
  }

  updateTransforms();
});

// Función para actualizar las transformaciones de los elementos
function updateTransforms() {
  arrtitulos.forEach((titulo) => {
    titulo.style.transform = `translateY(${(size - 1 - index) * -100}%)`;
  });
  arrfotos.forEach((foto) => {
    foto.style.transform = `translateY(${index * -100}%)`;
  });
}

// Llamada inicial para establecer las transformaciones en la carga de la página
updateTransforms();


  
  