// Cada imagen tiene su dirección y un texto alternativo.
const imagenes = [
  { ruta: 'images/cafe.svg', descripcion: 'Dibujo de una taza de café' },
  { ruta: 'images/pasteleria.svg', descripcion: 'Dibujo de pastelería recién hecha' },
  { ruta: 'images/local.svg', descripcion: 'Dibujo del interior de una cafetería' }
];

const imagenCarrusel = document.querySelector('#imagen-carrusel');
if (imagenCarrusel) {
  let indice = 0;
  const numeroImagen = document.querySelector('#numero-imagen');
  function mostrarImagen(nuevoIndice) {
    indice = (nuevoIndice + imagenes.length) % imagenes.length;
    imagenCarrusel.src = imagenes[indice].ruta;
    imagenCarrusel.alt = imagenes[indice].descripcion;
    numeroImagen.textContent = (indice + 1) + ' / ' + imagenes.length;
  }
  document.querySelector('#anterior').addEventListener('click', function () { mostrarImagen(indice - 1); });
  document.querySelector('#siguiente').addEventListener('click', function () { mostrarImagen(indice + 1); });
}

// El formulario se valida con JavaScript y muestra mensajes en la página.
const formulario = document.querySelector('#formulario-contacto');
if (formulario) {
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const nombre = document.querySelector('#nombre').value.trim().replace(/\s+/g, ' ');
    const correo = document.querySelector('#correo').value.trim();
    const telefono = document.querySelector('#telefono').value.trim();
    const mensaje = document.querySelector('#mensaje').value.trim().replace(/\s+/g, ' ');
    const errorNombre = document.querySelector('#error-nombre');
    const errorCorreo = document.querySelector('#error-correo');
    const errorTelefono = document.querySelector('#error-telefono');
    const errorMensaje = document.querySelector('#error-mensaje');
    const estado = document.querySelector('#estado-formulario');
    let formularioValido = true;
    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorTelefono.textContent = '';
    errorMensaje.textContent = '';
    estado.textContent = '';

    if (nombre.length < 2 || nombre.length > 60) { errorNombre.textContent = 'Escribí un nombre de entre 2 y 60 caracteres.'; formularioValido = false; }
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!expresionCorreo.test(correo) || correo.length > 100) { errorCorreo.textContent = 'Ingresá un correo válido. Ejemplo: nombre@correo.com'; formularioValido = false; }
    const expresionTelefono = /^\+?[0-9][0-9\s().-]{7,19}$/;
    if (!expresionTelefono.test(telefono)) { errorTelefono.textContent = 'Ingresá un teléfono válido con al menos 8 números.'; formularioValido = false; }
    if (mensaje.length < 10 || mensaje.length > 500) { errorMensaje.textContent = 'El mensaje debe tener entre 10 y 500 caracteres.'; formularioValido = false; }
    if (!formularioValido) { estado.textContent = 'Revisá los campos marcados e intentá nuevamente.'; return; }

    // Creamos elementos HTML para mostrar los datos ingresados.
    const resumen = document.querySelector('#resumen');
    resumen.replaceChildren();
    const titulo = document.createElement('h3');
    titulo.textContent = '¡Gracias por escribirnos, ' + nombre + '!';
    const lineaCorreo = document.createElement('p');
    lineaCorreo.textContent = 'Correo: ' + correo;
    const lineaTelefono = document.createElement('p');
    lineaTelefono.textContent = 'Teléfono: ' + telefono;
    const lineaMensaje = document.createElement('p');
    lineaMensaje.textContent = 'Mensaje: ' + mensaje;
    resumen.append(titulo, lineaCorreo, lineaTelefono, lineaMensaje);
    formulario.reset();
  });
}
