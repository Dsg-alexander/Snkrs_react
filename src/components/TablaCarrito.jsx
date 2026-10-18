import { Link } from 'react-router-dom'
import ImagenProducto from './ImagenProducto'
import { formatoPrecio } from '../lib/datos'

function TablaCarrito({ lineas, onMas, onMenos, onQuitar }) {
  return (
    <div className="tabla-scroll">
      <table id="tablaProductos" className="tabla tabla-carrito">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Talla</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th><span className="solo-lectores">Quitar</span></th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((l) => (
            <tr key={`${l.productoId}-${l.talla}`}>
              <td data-etiqueta="Producto">
                <Link to={`/producto/${l.productoId}`} className="celda-producto">
                  <span className="mini"><ImagenProducto producto={l.producto} /></span>
                  <span>
                    <strong>{l.producto.nombre}</strong>
                    <small>{l.producto.marca}</small>
                  </span>
                </Link>
              </td>
              <td data-etiqueta="Talla">{l.talla} US</td>
              <td data-etiqueta="Cantidad">
                <div className="cantidad">
                  <button type="button" onClick={() => onMenos(l.productoId, l.talla)} aria-label="Quitar una unidad">−</button>
                  <span>{l.cantidad}</span>
                  <button type="button" onClick={() => onMas(l.productoId, l.talla)} aria-label="Agregar una unidad">+</button>
                </div>
              </td>
              <td data-etiqueta="Precio">{formatoPrecio(l.producto.precio * l.cantidad)}</td>
              <td>
                <button type="button" className="enlace-peligro" onClick={() => onQuitar(l.productoId, l.talla)}>Quitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaCarrito
