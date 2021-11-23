
/* -------------toma notas del campo txt y las imprime debajo------------------------------------- */
function thisComponent(id){
    return document.getElementById(id)
}
function getRs() {
    var txt = thisComponent('txt').value
    const d = new Date()
    var formatoFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

	thisComponent('rs').innerHTML += "<div id='fechadiv'><small>"+ d.toLocaleDateString(undefined, formatoFecha) +" ☆ "+ d.toLocaleTimeString() +"</small></div><div contenteditable='true' class= card ><p>" + txt + "</p> </div>";

/*	Post para crear una nota(localhost:8080/note/addNota) */

	$.post("localhost:8080/note/addNota",
    {
      user_id: "1",
      creation_date: "fechita de ejemplo",
      descripcion: "descripcioncita de ejemplo"
    },
    function(data, status){
      alert("Resultado: " + JSON.stringify(data) + "\nStatus : " + status);
    });
		
	/* Get para obtener todas las notas de un user ID(localhost:8080/notes/NotasByUserId/{userId})*/
	$.getJSON("localhost:8080/notes/NotasByUserId/1", function(data, status){
		alert("Resultado: " + JSON.stringify(data) + "\nStatus : " + status);
	  });


}

/* ---------------------------Borra contenido de txt--------------------------- */

function Borrartxt() {
    document.getElementById("txt").value = "";
}
 
/* ---------------------------Barra Menu------------------------------------- */

$(document).ready(main);

var contador = 1;

function main () {
	$('.menu_bar').click(function(){
		if (contador == 1) {
			$('nav').animate({
				left: '0'
			});
			contador = 0;
		} else {
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
		}
	});

	/* Muestra y oculta submenus */
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}
/* ----------------------------Mostrar Contraseña------------------------------------ */

function MostrarContraseña() {
	var vClave = document.getElementById('inputClave');
	if (vClave.type === "password") {
	  vClave.type = "text";
	} else {
	  vClave.type = "password";
	}
}

/* ------------------------------Validacion de registro---------------------------------- */
 
function validacionRegistro(){
	var mensajeError = [];
	var vNombre = document.getElementById('inputNombre');
	var vMail = document.getElementById('inputMail');
	var vClave = document.getElementById('inputClave');
	var error = document.getElementById('error');

	if (vNombre.value === ""  || vNombre.value === null) {
		mensajeError.push('• Debes completar con tu nombre.');
	}
	if (vMail.value === ""  || vMail.value === null) {
		mensajeError.push('• Debes completar con tu mail.');
	}
	if (vClave.value === ""  || vClave.value === null) {
		mensajeError.push('• Debes ingresar una contraseña.');

	}
	if (mensajeError.length === 0 ){
		alert('Ya estas registrado! Puedes volver a la pantalla de LOGIN haciendo click en el icono de la taza! ;)');
	}   
	error.innerHTML = mensajeError.join('<br>');
	return false;
}
	  	 
/*-------------------creacion de usuario-------------------------------*/ 

	 $("btnRegistro").click(
		function() {
			post("localhost:8080/user/addUsuario",
			{
			username: "donaldDuck",
			password: "duckburg"
			},
			function(data, status){
			alert("Resultado: " + JSON.stringify(data) + "\nStatus : " + status);
			});  
 		});

/* Get para obtener un usuario por Username(localhost:8080/user/Usuario/{username}) */

		 $.getJSON("localhost:8080/user/Usuario/nana", function(data, status){
			  alert("Resultado: " + JSON.stringify(data) + "\nStatus : " + status);
			});





/* ----------------traer todas la notas cuando esta abierta la pagina--------------------------------- 

window.onload = function() {
	traerNotas();
};

function traerNotas(){
	
$.getJSON("https://httpbin.org/get", function(data, status){
	getRS("Resultado: " + JSON.stringify(data) + "\nStatus : " + status);
})

}

*/




