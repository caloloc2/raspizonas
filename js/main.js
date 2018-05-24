var z1 = 0; // estado de la zona 1
var z2 = 0; // estado de la zona 2
var z3 = 0; // estado de la zona 3
var z4 = 0; // estado de la zona 4

// funcion que se ejecuta al presionar cada una de las zonas
function Zonas(zona, estado){
	var valor = 0;
	switch (zona) { // segun la zona apaga o prende dicha zona y guarda en valor
		case 1:
			z1 = Math.abs(z1-1);
			valor = z1;
			break;
		case 2:
			z2 = Math.abs(z2-1);
			valor = z2;
			break;
		case 3:
			z3 = Math.abs(z3-1);
			valor = z3;
			break;
		case 4:
			z4 = Math.abs(z4-1);
			valor = z4;
			break;
	}

	// llama al archivo reles.php donde se envia la zona escogida y el estado
	// configurado anteriomente
	$.ajax({
		url: 'reles.php',
		data:{
			rele: zona, // zona escogida
			estado: valor // estado apagado o prendido
		},
		type: 'POST',
		dataType: 'json',
		async: false,
		success: function(datos) {
			// prende o apaga la zona seleccionada
			if (valor==1){
				$('.zonas > .item:nth-child('+zona+') > a').addClass('activo');	
			}else{
				$('.zonas > .item:nth-child('+zona+') > a').removeClass('activo');	
			}
			
			Mensaje(datos[0]['respuesta']); // muestra el mensaje de confirmacion
		},
		error:function(e){
			console.log(e.responseText); // en caso de error
		}
	});
}

// funcion que muestra el mensaje en pantalla
function Mensaje(mensaje){
	$('.mensaje').html(mensaje); // ingresa el texto del mensaje
	$('.mensaje').fadeIn(250); // muestra
	setTimeout(function(){
		$('.mensaje').fadeOut(250); // lo desaparece despues de 2 segundso
	}, 2000)
}


// funcion que se ejecuta al presionar el boton guardar
$('#configura_hora').submit(function(){
	$.ajax({
		url: 'hora.php',
		data:{
			hora: document.getElementById('tiempo').value // envia la hora configurada
		},
		type: 'POST',
		dataType: 'json',
		async: false,
		success: function(datos) {
			Mensaje(datos[0]['respuesta']); // muestra la respuesta de confirmacion
		},
		error:function(e){
			console.log(e.responseText); // en caso de error
		}
	});
	return false;
})