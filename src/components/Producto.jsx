import React from 'react'
import { Link } from 'react-router-dom'
import TablaCarrito from './TablaCarrito'
import FormularioPago from './FormularioPago'

function Producto({ nombre, precio, imagen, carrito, agregarAlCarrito, comprar }) {
  const tallas = ['7', '7.5', '8', '8.5', '9']

  const seleccionarTalla = (talla) => {
    const producto = {
      id: carrito.length + 1,
      nombre: nombre,
      talla: talla,
      precio: precio
    }
    agregarAlCarrito(producto)
  }

  return (
    <div className="contenedor-producto">
      <Link to="/">
        <h1 className="titulo">
          Volver a Sneakers
        </h1>
      </Link>

      <h2 className="titulo">
        Compra De {nombre.replace(' Sneak', '')}
      </h2>

      <div>
        <img 
          src={imagen}
          width="215"
          height="215"
          alt={nombre}
        />
      </div>

      <div className="botones-talla">
        {tallas.map((talla) => (
          <button 
            key={talla} 
            className="btn btn-secondary btn-sm"
            onClick={() => seleccionarTalla(talla)}
          >
            {talla} us
          </button>
        ))}
      </div>

      <br /><br />

      <TablaCarrito carrito={carrito} />

      <br /><br />

      <FormularioPago onComprar={comprar} />
    </div>
  )
}

export default Producto
