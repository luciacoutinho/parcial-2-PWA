//avigator.serviceWorker.register('sw.js');
if (navigator.serviceWorker) {
 navigator.serviceWorker.register('sw.js')
}

const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];
// FORMATO:
//let lista = [ { nota: 'descripción de la nota', fecha: '17/11/2022'} ];


document.addEventListener('DOMContentLoaded', function () {
 let sideNav = document.querySelectorAll('.sidenav');
 let instanciaSide = M.Sidenav.init(sideNav, {});

 let modal = document.querySelectorAll('.modal');
 let instanciaModal = M.Modal.init(modal, {});

 lista = leerNotas();
 renderizarNotas(lista);
});

/* - FUNCION 1: Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', () => {
 // console.log(lista)

 let valorTextarea = textArea.value;
 lista.push(valorTextarea);
 console.log(lista)

 guardarNotas(lista);
})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(array) {
 localStorage.setItem('lista', JSON.stringify(array))
 // localStorage.lista = JSON.stringify(array);
 renderizarNotas(array);
}

/* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */
function leerNotas() {
 return localStorage.getItem('lista') ?
  JSON.parse(localStorage.getItem('lista')) : [];
 // return JSON.parse(localStorage.lista);
}

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array) {
 console.log(array)

 let html = '';

 for (const nota of array) {
  console.log(nota);
  html += `<li>${nota}</li> `
 }

 container.innerHTML = html
}