import { Link } from 'react-router-dom'
import ImagenProducto from './ImagenProducto'
import { formatoPrecio } from '../lib/datos'

export default function TarjetaProducto({ producto }) {
  const agotado = producto.stock <= 0
  return (
    <Link to={`/producto/${producto.id}`} className="tarjeta">
      <div className="tarjeta-img">
        <ImagenProducto producto={producto} />
        {agotado && <span className="sello">Agotado</span>}
      </div>
      <div className="tarjeta-info">
        <span className="tarjeta-marca">{producto.marca}</span>
        <h3>{producto.nombre}</h3>
        <span className="precio">{formatoPrecio(producto.precio)}</span>
      </div>
    </Link>
  )
}
