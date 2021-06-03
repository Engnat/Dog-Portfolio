"use strict";
(function() {
  let hamburger = {
    navToggle: document.querySelector('.nav-toggle'),
    nav: document.getElementById('navM'),

    doToggle: function(e) {
      e.preventDefault();
      this.navToggle.classList.toggle('expanded');
      this.nav.classList.toggle('expanded');
    }
  };

  hamburger.navToggle.addEventListener('click', function(e) {
     hamburger.doToggle(e);
  }
 );
 }());


let listaSecundaria = [];
let imagenes = [];
let imagenInicial = 0;

function loadJSON(callback) {
  var rta = new XMLHttpRequest();
  rta.overrideMimeType("application/json");
  rta.open('GET', 'js/producto.json', true);
  rta.onreadystatechange = function() {
    if (rta.readyState == 4 && rta.status == "200") {
      callback(rta.responseText);
    }
  }
    rta.send(null);
  }
  loadJSON(function(response) {
  imagenes = JSON.parse(response);
  lazyLoad();

});

function lazyLoad(){
  let boton = document.getElementById("btn-ver-mas");
  if (imagenes.length > listaSecundaria.length) {
    listaSecundaria = imagenes.slice(0 , listaSecundaria.length+10);
    for (var i = imagenInicial; i < listaSecundaria.length; i++) {
      var temp = document.createElement('div');
      temp.classList.add('contenedorImg');
      temp.innerHTML = tarjetaImagen(listaSecundaria[i], listaSecundaria[i].id);
      var htmlObject = temp.firstChild;
      document.getElementById("grilla-portafolio").append(temp);
      if (imagenes.length == listaSecundaria.length) {
        boton.style.backgroundColor = "#c0c0c0";
        boton.style.cursor = "none";
        boton.innerHTML = "No more options";
      }
    }
    imagenInicial = listaSecundaria.length;
  }

}

function tarjetaImagen(producto , idImg){
  idImg = 'img_' + producto.id++;
  return `
  <div class="imagen" onmouseover="infoImagen(${idImg})" onmouseout="defaulImg(${idImg})">
    <div id="${idImg}" class="info-imagen ocultarTarjeta">
      <div>
        <h3>${producto.titulo}</h3>
        <hr>
        <p>${producto.info}</p>
      </div>
    </div>
    <img src="${producto.foto}" alt="${producto.titulo}">
  </div>
  `
}

function infoImagen(card){
  let tarjetaInfo = card.id;
  if(tarjetaInfo.className == "info-imagen"){
    document.getElementById(card.id).className = 'ocultarTarjeta';
  }else {
    document.getElementById(card.id).classList.remove('ocultarTarjeta');
  }
}

function defaulImg(card){
  let tarjetaInfo = card.id;
  document.getElementById(card.id).classList.add('ocultarTarjeta');
}

function mostrarMas(){
  let boton = document.getElementById("btn-ver-mas");
  let media = window.matchMedia("(min-width: 700px)");

  if(media.matches){
    boton.addEventListener('click', cambioAlto)
    function cambioAlto(){
      lazyLoad();
   }
 }
}




mostrarMas();
