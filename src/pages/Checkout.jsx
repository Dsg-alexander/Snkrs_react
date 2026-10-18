import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import FormularioPago from '../components/FormularioPago'
import ImagenProducto from '../components/ImagenProducto'
import { formatoPrecio } from '../lib/datos'

export default function Checkout() {
  const { lineas, subtotal, crearPedido } = useTienda()
  const { usuario } = useAuth()
  const { avisar } = useToast()
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)

  if (lineas.length === 0 && !cargando) return <Navigate to="/carrito" replace />

  const comprar = ({ direccion }) => {
    setCargando(true)
    const r = crearPedido(usuario, direccion)
    if (r.ok) {
      avisar(`Compra realizada. Tu pedido es el ${r.pedido.id}.`)
      navigate('/perfil', { replace: true, state: { nuevo: r.pedido.id } })
    } else {
      setCargando(false)
      avisar(r.error, 'error')
    }
  }

  return (
    <div className="contenedor seccion">
      <h1 className="titulo-pagina">Pagar</h1>
      <div className="dos-columnas dos-columnas-pago">
        <div className="panel">
          <h2>Datos de pago y envío</h2>
          <FormularioPago onComprar={comprar} cargando={cargando} />
        </div>
        <aside className="panel resumen">
          <h2>Tu pedido</h2>
          <ul className="mini-lista">
            {lineas.map((l) => (
              <li key={`${l.productoId}-${l.talla}`}>
                <span className="mini"><ImagenProducto producto={l.producto} /></span>
                <span><strong>{l.producto.nombre}</strong><small>Talla {l.talla} US, x{l.cantidad}</small></span>
                <span>{formatoPrecio(l.producto.precio * l.cantidad)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div><dt>Envío</dt><dd>Gratis</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatoPrecio(subtotal)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  )
}
