import React from 'react'

function TablaCarrito({ carrito }) {
  return (
    <table id="tablaProductos" className="productos table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Talla</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {carrito.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.talla}</td>
            <td>${item.precio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablaCarrito
