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
- Vite
- Bootstrap 5 (solo como base; el diseño es CSS propio en `estilos.css`)
- Jasmine + Karma (pruebas unitarias), con webpack + Babel para poder probar componentes JSX
- Testing Library (renderiza los componentes en las pruebas)

## Como ejecutar

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

## Cuenta de administrador de prueba

- Correo: `admin@snkrs.cl`
- Contraseña: `Admin123`

Se crea automaticamente la primera vez que se abre la app. Cualquier otra
persona que se registre queda como `cliente`; un admin puede cambiarle el rol
desde **Panel admin > Usuarios**.

> Los datos (productos, usuarios, pedidos, carrito) se guardan en `localStorage`
> porque el proyecto no tiene backend. Es una demo: con un backend real el login
> y las contraseñas se manejan en el servidor. Para volver al estado inicial,
> borra los datos del sitio desde las herramientas del navegador.

## Pruebas unitarias

```bash
npm test
```

Usa Karma + Jasmine y necesita Google Chrome instalado. Ejecuta 34 pruebas:
10 de logica (carrito y validaciones) y 3 por cada componente de `src/components` (24).
La configuracion esta en `karma.conf.cjs` (es `.cjs` porque `package.json` tiene `"type": "module"`).

## Estructura

```
src/
  context/
    AuthContext.jsx     - Sesion, registro, login y roles (admin / cliente)
    TiendaContext.jsx   - Catalogo, carrito, pedidos y acciones de admin
    ToastContext.jsx    - Avisos en pantalla (reemplazan a alert)
  lib/
    datos.js            - Catalogo inicial y constantes (limite del carrito, tallas)
    validaciones.js     - Validaciones del formulario de pago y registro
    almacen.js          - Lectura/escritura en localStorage
    seguridad.js        - Hash SHA-256 de la contraseña (solo demo)
  components/
    Navbar.jsx, Footer.jsx
    TarjetaProducto.jsx, ImagenProducto.jsx, Zapatilla.jsx
    TablaCarrito.jsx, FormularioPago.jsx, RutaProtegida.jsx
  pages/
    Home.jsx, Tienda.jsx, DetalleProducto.jsx, Carrito.jsx, Checkout.jsx
    Login.jsx, Registro.jsx, Perfil.jsx
    admin/              - Resumen, Productos, Pedidos, Usuarios
  tests/
    carrito.spec.js     - Logica del carrito
    formulario.spec.js  - Validaciones del formulario de pago
    componentes/        - 3 pruebas por componente (*.spec.jsx)
  App.jsx               - Providers + rutas
  main.jsx
  estilos.css
```

## Funcionalidades
- Catalogo con busqueda, filtro por marca y orden por precio
- Detalle de producto con seleccion de talla
- Carrito con limite de 4 pares por compra y control de stock
- Registro e inicio de sesion; el pago exige estar con sesion iniciada
- Formulario de pago con validacion (tarjeta, vencimiento, CVV, direccion)
- Historial de pedidos del cliente
- Panel de administracion (solo rol admin): resumen de ventas, CRUD de
  productos (con stock, visibilidad y destacados), pedidos con cambio de estado
  y gestion de usuarios y roles
- Las rutas antiguas `/jordan`, `/mk` y `/karl` redirigen a la tienda filtrada
- Diseño responsivo
- Pruebas unitarias de logica de carrito y validaciones, y de cada componente
