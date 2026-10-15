# Snkrs React - Tienda de Sneakers

Proyecto actualizado a React
Evaluacion Parcial 2
##
Docente: Byron Andres Aros Araya

## Integrantes
- Benjamin Saavedra
- Diego Santibañez
- Victor Espionoza

## Tecnologias
- React 18
- React Router DOM
- Bootstrap 5
- Vite
- Jasmine + Karma (pruebas unitarias)

## Como ejecutar

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

## Pruebas unitarias

```bash
npm test
```

## Estructura

```
src/
  components/
    Home.jsx          - Pagina principal con logos de marcas
    Producto.jsx      - Componente reutilizable de producto (props + state)
    TablaCarrito.jsx  - Tabla del carrito
    FormularioPago.jsx - Formulario con validacion
    Footer.jsx
  tests/
    carrito.spec.js
    formulario.spec.js
  App.jsx             - Estado global del carrito + rutas
  main.jsx
  estilos.css
```

## Funcionalidades
- Navegacion entre marcas con React Router
- Carrito con limite de 4 productos (state en App)
- Seleccion de tallas
- Formulario de pago con validacion basica
- Diseño responsivo con Bootstrap
- Pruebas unitarias de logica de carrito y validaciones
