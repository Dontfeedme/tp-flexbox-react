/* ============================================================
   flexbox.js — Lógica del Ejercicio 1
   - Genera tarjetas dinámicamente desde un arreglo de objetos.
   - Botón "Ordenar por precio": reordena las tarjetas.
   - Botón "Resaltar económicas": resalta/atenúa según el precio.
   ============================================================ */

// Arreglo de objetos: cada uno representa una fruta (una tarjeta).
// Son más de 6 para cumplir con la consigna y poder ver el flex-wrap.
const frutas = [
  { nombre: "Manzana",  categoria: "De pepita", precio: 850,  emoji: "🍎", color: "#e53935" },
  { nombre: "Banana",   categoria: "Tropical",  precio: 1200, emoji: "🍌", color: "#fbc02d" },
  { nombre: "Naranja",  categoria: "Cítrico",   precio: 700,  emoji: "🍊", color: "#fb8c00" },
  { nombre: "Frutilla", categoria: "Berry",     precio: 2100, emoji: "🍓", color: "#d81b60" },
  { nombre: "Uva",      categoria: "De parra",  precio: 1800, emoji: "🍇", color: "#8e24aa" },
  { nombre: "Sandía",   categoria: "Melón",     precio: 1500, emoji: "🍉", color: "#43a047" },
  { nombre: "Kiwi",     categoria: "Tropical",  precio: 1950, emoji: "🥝", color: "#7cb342" },
  { nombre: "Pera",     categoria: "De pepita", precio: 950,  emoji: "🍐", color: "#9ccc65" }
];

// Precio por debajo del cual una fruta se considera "económica".
const PRECIO_ECONOMICO = 1000;

// Referencias a elementos del DOM que se usan varias veces.
const contenedor = document.getElementById("tarjetas");
const btnOrdenar = document.getElementById("btnOrdenar");
const btnResaltar = document.getElementById("btnResaltar");

// Banderas de estado para que cada botón funcione como interruptor (toggle).
let ordenAscendente = true;   // controla el sentido del ordenamiento
let resaltadoActivo = false;  // controla si el resaltado está encendido

/**
 * Crea el elemento DOM de una tarjeta a partir de un objeto fruta.
 * Devuelve el <div> listo para insertar en el contenedor.
 */
function crearTarjeta(fruta) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  // Cabecera de color con el emoji de la fruta.
  // El color de fondo viene del propio dato del objeto.
  const cabecera = document.createElement("div");
  cabecera.className = "tarjeta__cabecera";
  cabecera.style.backgroundColor = fruta.color;
  cabecera.textContent = fruta.emoji;

  // Cuerpo con nombre, categoría y precio.
  const cuerpo = document.createElement("div");
  cuerpo.className = "tarjeta__cuerpo";
  cuerpo.innerHTML = `
    <span class="tarjeta__nombre">${fruta.nombre}</span>
    <span class="tarjeta__categoria">${fruta.categoria}</span>
    <span class="tarjeta__precio">$${fruta.precio}</span>
  `;

  tarjeta.appendChild(cabecera);
  tarjeta.appendChild(cuerpo);
  return tarjeta;
}

/**
 * Vuelca el arreglo recibido al DOM: limpia el contenedor
 * y vuelve a dibujar todas las tarjetas.
 */
function renderizar(lista) {
  contenedor.innerHTML = ""; // limpia lo anterior
  lista.forEach(function (fruta) {
    contenedor.appendChild(crearTarjeta(fruta));
  });
}

/**
 * Botón "Ordenar por precio".
 * Ordena el arreglo de frutas alternando ascendente/descendente
 * y vuelve a renderizar. Actualiza el texto del botón.
 */
btnOrdenar.addEventListener("click", function () {
  frutas.sort(function (a, b) {
    return ordenAscendente ? a.precio - b.precio : b.precio - a.precio;
  });

  renderizar(frutas);

  // Invierte el sentido para el próximo clic y actualiza el rótulo.
  btnOrdenar.textContent = ordenAscendente
    ? "Ordenar por precio ↓"
    : "Ordenar por precio ↑";
  ordenAscendente = !ordenAscendente;

  // Si había un resaltado activo, lo volvemos a aplicar tras re-renderizar.
  if (resaltadoActivo) {
    aplicarResaltado();
  }
});

/**
 * Recorre las tarjetas del DOM y resalta las económicas,
 * atenuando las demás. Se apoya en el orden actual de "frutas".
 */
function aplicarResaltado() {
  const tarjetas = contenedor.querySelectorAll(".tarjeta");
  tarjetas.forEach(function (tarjeta, indice) {
    const esEconomica = frutas[indice].precio < PRECIO_ECONOMICO;
    tarjeta.classList.toggle("tarjeta--resaltada", esEconomica);
    tarjeta.classList.toggle("tarjeta--atenuada", !esEconomica);
  });
}

/**
 * Quita cualquier clase de resaltado/atenuado de todas las tarjetas.
 */
function quitarResaltado() {
  const tarjetas = contenedor.querySelectorAll(".tarjeta");
  tarjetas.forEach(function (tarjeta) {
    tarjeta.classList.remove("tarjeta--resaltada", "tarjeta--atenuada");
  });
}

/**
 * Botón "Resaltar económicas": funciona como interruptor.
 * Enciende o apaga el resaltado de las frutas más baratas.
 */
btnResaltar.addEventListener("click", function () {
  resaltadoActivo = !resaltadoActivo;

  if (resaltadoActivo) {
    aplicarResaltado();
    btnResaltar.textContent = "Quitar resaltado";
  } else {
    quitarResaltado();
    btnResaltar.textContent = "Resaltar económicas";
  }
});

// Render inicial al cargar la página.
renderizar(frutas);
