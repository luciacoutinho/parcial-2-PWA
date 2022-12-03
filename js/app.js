navigator.serviceWorker.register('../sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];
let btnsEliminar = [];
let idnotas = 0


document.addEventListener('DOMContentLoaded', function () {
 let sideNav = document.querySelectorAll('.sidenav');
 let instanciaSide = M.Sidenav.init(sideNav, {});

 let modal = document.querySelectorAll('.modal');
 let instanciaModal = M.Modal.init(modal, {});

 lista = leerNotas();
 renderizarNotas(lista);
 idnotas = lista.length;
});

/* - FUNCION 1: Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', () => {
 // console.log(lista)
 idnotas++
 let getFecha = new Date().toLocaleString();
 let nota = {
  nota: textArea.value,
  fecha: getFecha,
  id: idnotas
 }
 lista.push(nota);
 textArea.value = "";
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

 // let html = '';
 let btnid = 0;


 container.innerHTML = "";
 for (const nota of array) {

  btnid++;
  let li = document.createElement("li");
  let tachito = document.createElement("i");
  tachito.setAttribute("class", "bi bi-trash float-right btn-delete");
  tachito.setAttribute("id", btnid);
  li.appendChild(tachito);
  li.innerHTML = `<span>${nota.fecha}</span><br>${nota.nota}<i class="bi bi-trash float-right btn-delete eliminar" id="${nota.id}"></i>`;


  container.appendChild(li);



 }

 btnsEliminar = document.querySelectorAll('.eliminar');
 btnsEliminar.forEach(btn => {
  btn.addEventListener('click', () => {
   eliminarTask(parseInt(btn.id))
  })
 })


}


/* -------- Eliminar notas ------- */

function eliminarTask(id) {
 let index = null;
 for (const i in lista) {

  console.log(lista[i])
  if (lista[i].id === id) {
   index = i;
  }
 }
 console.log("Index" + index);
 console.log("Lista" + lista);
 lista.splice(index, 1);
 guardarNotas(lista)
}