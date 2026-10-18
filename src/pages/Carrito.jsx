import { Link, useNavigate } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext'
import { useToast } from '../context/ToastContext'
import TablaCarrito from '../components/TablaCarrito'
import { MAX_CARRITO, formatoPrecio } from '../lib/datos'

export default function Carrito() {
  const { lineas, unidades, subtotal, agregar, restar, quitar } = useTienda()
  const { avisar } = useToast()
  const navigate = useNavigate()

  const mas = (id, talla) => {
    const r = agregar(id, talla)
    if (!r.ok) avisar(r.error, 'error')
  }

  if (lineas.length === 0) {
    return (
      <div className="contenedor vacio">
        <h1>Tu carrito está vacío</h1>
        <p>Elige una talla en cualquier zapatilla para agregarla.</p>
        <Link className="boton boton-primario" to="/tienda">Ver zapatillas</Link>
      </div>
    )
  }

  return (
    <div className="contenedor seccion">
      <h1 className="titulo-pagina">Carrito</h1>
      <div className="dos-columnas">
        <TablaCarrito lineas={lineas} onMas={mas} onMenos={restar} onQuitar={quitar} />

        <aside className="panel resumen">
          <h2>Resumen</h2>
          <dl>
            <div><dt>Pares ({unidades} de {MAX_CARRITO})</dt><dd>{formatoPrecio(subtotal)}</dd></div>
            <div><dt>Envío</dt><dd>Gratis</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatoPrecio(subtotal)}</dd></div>
          </dl>
          <button type="button" className="boton boton-primario boton-ancho" onClick={() => navigate('/checkout')}>Ir a pagar</button>
          <Link to="/tienda" className="enlace centrado">Seguir comprando</Link>
        </aside>
      </div>
    </div>
  )
}
