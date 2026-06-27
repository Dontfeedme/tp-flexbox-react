/* ============================================================
   personas.js — Lógica del Ejercicio 2 (JavaScript común)
   Por ahora: lectura del formulario y validación básica.
   La tabla y el cálculo de IMC se agregan en pasos siguientes.
   ============================================================ */

// Referencias a los elementos del DOM que vamos a usar.
const form = document.getElementById("formPersona");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEdad = document.getElementById("edad");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensajeError = document.getElementById("mensajeError");

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
 * Maneja el envío del formulario: lee los campos, valida
 * y (en pasos posteriores) agrega la persona a la tabla.
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

  // (Próximo paso) agregar la persona a la tabla.
  form.reset();
  inputNombre.focus();
});
