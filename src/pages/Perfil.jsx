import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTienda } from '../context/TiendaContext'
import { formatoFecha, formatoPrecio } from '../lib/datos'
import { claseEstado } from './admin/ui'

export default function Perfil() {
  const { usuario } = useAuth()
  const { pedidos } = useTienda()
  const { state } = useLocation()
  const mios = pedidos.filter((p) => p.usuarioId === usuario.id)

  return (
    <div className="contenedor seccion">
      <h1 className="titulo-pagina">Hola, {usuario.nombre.split(' ')[0]}</h1>
      <p className="suave">{usuario.email}</p>

      <h2 className="subtitulo">Mis pedidos</h2>
      {mios.length === 0 ? (
        <div className="vacio">
          <p>Todavía no has hecho ninguna compra.</p>
          <Link className="boton boton-primario" to="/tienda">Ver zapatillas</Link>
        </div>
      ) : (
        <div className="pedidos">
          {mios.map((p) => (
            <article key={p.id} className={`panel pedido${state?.nuevo === p.id ? ' nuevo' : ''}`}>
              <header>
                <div><strong>{p.id}</strong><small>{formatoFecha(p.fecha)}</small></div>
                <span className={`pastilla ${claseEstado(p.estado)}`}>{p.estado}</span>
              </header>
              <ul>
                {p.items.map((i, k) => (
                  <li key={k}><span>{i.nombre}, talla {i.talla} US, x{i.cantidad}</span><span>{formatoPrecio(i.precio * i.cantidad)}</span></li>
                ))}
              </ul>
              <footer><span>Envío a {p.direccion}</span><strong>{formatoPrecio(p.total)}</strong></footer>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
