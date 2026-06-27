# tp-flexbox-react

Trabajo práctico de la facultad sobre **Flexbox**, **formularios dinámicos** y **React**.

Todo el sitio es estático (HTML, CSS y JavaScript), pensado para publicarse en
**GitHub Pages** sin build tools ni npm.

## Páginas

- **index.html** — Página principal con enlaces a los tres ejercicios.
- **flexbox.html** — Ejercicio 1: tarjetas organizadas con `display:flex`, generadas
  dinámicamente desde un arreglo de objetos en JS, con un botón que cambia la vista.
- **personas.html** — Ejercicio 2: formulario + tabla de personas con cálculo de IMC,
  usando JavaScript común y manipulación directa del DOM.
- **react.html** — Ejercicio 3: la misma funcionalidad del Ejercicio 2 pero con React
  (cargado por CDN + Babel standalone para escribir JSX en el navegador).

## Estructura

```
.
├── index.html
├── flexbox.html
├── personas.html
├── react.html
├── css/
│   └── estilos.css     # estilos compartidos por todas las páginas
└── js/
    ├── flexbox.js      # lógica del Ejercicio 1
    └── personas.js     # lógica del Ejercicio 2
```

## Cómo verlo

Abrir `index.html` en el navegador, o servirlo con cualquier servidor estático.
No requiere instalación de dependencias.
