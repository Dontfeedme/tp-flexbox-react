/* ============================================================
   personas.js — Lógica del Ejercicio 2 (JavaScript común)
   - Lee el formulario y valida los datos.
   - Agrega cada persona a una tabla manipulando el DOM.
   El cálculo de IMC y el botón de quitar se agregan en el paso final.
   ============================================================ */

// Referencias a los elementos del DOM que vamos a usar.
const form = document.getElementById("formPersona");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEdad = document.getElementById("edad");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensajeError = document.getElementById("mensajeError");
const cuerpoTabla = document.getElementById("cuerpoTabla");

// Arreglo que mantiene en memoria todas las personas cargadas.
const personas = [];

// Contador para asignar un id único a cada persona (sirve para quitarla luego).
let proximoId = 1;

/**
 * Calcula el Índice de Masa Corporal: peso / (altura * altura).
 * Devuelve el resultado redondeado a 1 decimal.
 */
function calcularImc(peso, altura) {
  const imc = peso / (altura * altura);
  return imc.toFixed(1); // string con 1 decimal, ej: "22.9"
}

/**
 * Quita del arreglo la persona cuyo id coincide y redibuja la tabla.
 */
function quitarPersona(id) {
  const indice = personas.findIndex(function (p) {
    return p.id === id;
  });
  if (indice !== -1) {
    personas.splice(indice, 1); // elimina 1 elemento en esa posición
    renderizarTabla();
  }
}

/**
 * Valida los datos del formulario.
 * Devuelve un texto de error si algo está mal, o "" si todo es válido.
 */
function validar(datos) {
  // Ningún campo de texto puede quedar vacío.
  if (datos.nombre === "" || datos.apellido === "") {
    return "El nombre y el apellido son obligatorios.";
  }
  // Edad, altura y peso deben ser números válidos y mayores a cero.
  if (isNaN(datos.edad) || datos.edad <= 0) {
    return "La edad debe ser un número mayor a cero.";
  }
  if (isNaN(datos.altura) || datos.altura <= 0) {
    return "La altura debe ser un número mayor a cero (en metros).";
  }
  if (isNaN(datos.peso) || datos.peso <= 0) {
    return "El peso debe ser un número mayor a cero (en kg).";
  }
  return ""; // sin errores
}

/**
 * Vuelve a dibujar toda la tabla a partir del arreglo "personas".
 * Limpia el <tbody> y crea una fila por cada persona.
 */
function renderizarTabla() {
  cuerpoTabla.innerHTML = ""; // borra las filas actuales

  // Si no hay personas, mostramos una fila informativa.
  if (personas.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.className = "vacio";
    filaVacia.innerHTML = '<td colspan="7">Todavía no hay personas cargadas.</td>';
    cuerpoTabla.appendChild(filaVacia);
    return;
  }

  // Creamos una fila por cada persona del arreglo.
  personas.forEach(function (persona) {
    const fila = document.createElement("tr");

    // Calculamos el IMC de esta persona para mostrarlo en su columna.
    const imc = calcularImc(persona.peso, persona.altura);

    fila.innerHTML = `
      <td>${persona.nombre}</td>
      <td>${persona.apellido}</td>
      <td>${persona.edad}</td>
      <td>${persona.altura}</td>
      <td>${persona.peso}</td>
      <td>${imc}</td>
      <td></td>
    `;

    // Botón para quitar esta fila. Se crea aparte para enlazarle el evento
    // con el id de la persona (evita problemas con onclick en el HTML).
    const botonQuitar = document.createElement("button");
    botonQuitar.className = "boton-quitar";
    botonQuitar.textContent = "Quitar";
    botonQuitar.addEventListener("click", function () {
      quitarPersona(persona.id);
    });

    // Insertamos el botón en la última celda (la de "Acciones").
    fila.lastElementChild.appendChild(botonQuitar);

    cuerpoTabla.appendChild(fila);
  });
}

/**
 * Maneja el envío del formulario: lee los campos, valida
 * y agrega la persona a la tabla.
 */
form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  // Tomamos los valores; usamos trim() para descartar espacios sobrantes.
  const datos = {
    nombre: inputNombre.value.trim(),
    apellido: inputApellido.value.trim(),
    edad: parseInt(inputEdad.value, 10),
    altura: parseFloat(inputAltura.value),
    peso: parseFloat(inputPeso.value)
  };

  // Validación: si hay error, lo mostramos y no seguimos.
  const error = validar(datos);
  if (error !== "") {
    mensajeError.textContent = error;
    return;
  }

  // Si todo está bien, limpiamos el mensaje de error.
  mensajeError.textContent = "";

  // Le asignamos un id único antes de guardarla (sirve para quitarla después).
  datos.id = proximoId;
  proximoId = proximoId + 1;

  // Agregamos la persona al arreglo y redibujamos la tabla.
  personas.push(datos);
  renderizarTabla();

  // Limpiamos el formulario y dejamos el foco listo para la próxima carga.
  form.reset();
  inputNombre.focus();
});

// Render inicial: muestra la fila de "tabla vacía" al cargar la página.
renderizarTabla();
