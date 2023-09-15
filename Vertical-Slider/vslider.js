let titulos = document.getElementById("titulos");
let arrtitulos = titulos.querySelectorAll("div");

let fotos = document.getElementById("fotos");
let arrfotos = fotos.querySelectorAll("div");

let size = arrtitulos.length;
let arrDown = document.getElementById("arrDown");
let arrUp = document.getElementById("arrUp");


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


function updateTransforms() {
  arrtitulos.forEach((titulo) => {
    titulo.style.transform = `translateY(${(size - 1 - index) * -100}%)`;
  });
  arrfotos.forEach((foto) => {
    foto.style.transform = `translateY(${index * -100}%)`;
  });
}


updateTransforms();


  
  