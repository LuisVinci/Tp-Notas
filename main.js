
/* -------------toma notas del campo txt y las imprime debajo------------------------------------- */
function thisComponent(id){
    return document.getElementById(id)
}

function crearNota() {
	var txt = thisComponent('txt').value;
	borrarListadoNotas();
	imprimirNota(txt, new Date());
	//llamo a la funcion para imprimir una nota en pantalla
	//imprimirNota(txt, new Date());
	
	/*	Post para crear una nota(localhost:8080/note/addNota) */
	const urlParams = new URLSearchParams(window.location.search);
	//de la URL, extraigo el queryparam ID. Luego lo concateno a la URL del backend
	$.post("http://127.0.0.1:8080/note/addNota/",
    {
      user_id: urlParams.get('id'),
      date_created: new Date(),
      descripcion: txt
    },
    function(data, status){
		alert("Nota creada satisfactoriamente.")
		location.href = '/PaginaPrincipal.html?id=' + urlParams.get('id');
    });
	
}

/* ---------------------------Imprimir notas--------------------------- */
function imprimirNota(nota, fechaCreacion) {
	//convierto fechaCreacion(tipo TIMESTAMPS) a dateFechaCreacion(tipo DATE) asi puedo parsearlo
	var dateFechaCreacion = new Date(fechaCreacion);
	var formatoFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	thisComponent('rs').innerHTML += "<div id='fechadiv'><small>"+ dateFechaCreacion.toLocaleDateString(undefined, formatoFecha) +" ☆ "+ dateFechaCreacion.toLocaleTimeString() +"</small></div><div contenteditable='true' class= card ><p>" + nota + "</p> </div>";
}
/* ---------------------------Borra contenido de txt--------------------------- */

function Borrartxt() {
    document.getElementById("txt").value = "";
}
 
/* ---------------------------Borra contenido de notas--------------------------- */

function borrarListadoNotas() {
    document.getElementById('rs').innerHTML = "";
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
	  

/* ------------------------------Login usado en index.html---------------------------------- */
 
function Login(){
	var vNombre = document.getElementById('inputNombre');
	var vClave = document.getElementById('inputClave');

	if(vNombre.value === "" || vClave.value === "") {
		alert("Es necesario cargar usuario y contraseña para logearse")
	} else {
		/* Get para obtener un usuario por Username(localhost:8080/user/Usuario/{username}) */
		var url = "http://127.0.0.1:8080/user/Usuario/" + vNombre.value;
		$.getJSON(url, function(data, status) {
			if(data.password == null ){
				alert("Usuario inexistente.");
			} else if(data.password != vClave.value) {
				alert("Contraseña incorrecta.");
			} else {
				alert("Usuario logeado satisfactoriamente.");
				//redirecciono a la pagina principal
				location.href = '/PaginaPrincipal.html?id=' + data.id;
			}
		});
	}
}
/* ----------------traer todas la notas --------------------------------- */

function traerNotas() {
	//traigo la URL
	const urlParams = new URLSearchParams(window.location.search);
	//de la URL, extraigo el queryparam ID. Luego lo concateno a la URL del backend
	const url = "http://127.0.0.1:8080/note/NotasByUserId/" + urlParams.get('id');
	$.getJSON(url, function(data, status){
		//tomo el data(con la lista de notas en formato texto), y usando JSON.parse obtengo un Array de notas ordenada
		var jsonArrayNotas = JSON.parse(JSON.stringify(data));
		for (var i = 0; i < jsonArrayNotas.notas.length; i++) {
			var descripcion = jsonArrayNotas.notas[i].descripcion;
			var dateCreated = jsonArrayNotas.notas[i].date_created;
			imprimirNota(descripcion, dateCreated)
		}
		
	})
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
