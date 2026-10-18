import { useTienda } from '../../context/TiendaContext'
import { useToast } from '../../context/ToastContext'
import { ESTADOS, formatoFecha, formatoPrecio } from '../../lib/datos'
import { claseEstado } from './ui'

export default function AdminPedidos() {
  const { pedidos, cambiarEstado } = useTienda()
  const { avisar } = useToast()

  const cambiar = (p, estado) => {
    cambiarEstado(p.id, estado)
    avisar(estado === 'Cancelado' ? `${p.id} cancelado. El stock volvió a la tienda.` : `${p.id} ahora está ${estado.toLowerCase()}.`)
  }

  return (
    <>
      <h1 className="titulo-pagina">Pedidos</h1>
      {pedidos.length === 0 ? (
        <div className="vacio"><p>Aún no hay pedidos. Aparecerán aquí cuando un cliente compre.</p></div>
      ) : (
        <div className="tabla-scroll">
          <table className="tabla">
            <thead><tr><th>Pedido</th><th>Cliente</th><th>Detalle</th><th>Total</th><th>Estado</th></tr></thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.id}</strong><small className="bloque">{formatoFecha(p.fecha)}</small></td>
                  <td>{p.usuarioNombre}<small className="bloque">{p.direccion}</small></td>
                  <td>{p.items.map((i) => `${i.nombre} (${i.talla}) x${i.cantidad}`).join(', ')}</td>
                  <td>{formatoPrecio(p.total)}</td>
                  <td>
                    {p.estado === 'Cancelado' ? (
                      <span className={`pastilla ${claseEstado(p.estado)}`}>Cancelado</span>
                    ) : (
                      <select className="select-estado" value={p.estado} onChange={(e) => cambiar(p, e.target.value)} aria-label={`Estado de ${p.id}`}>
                        {ESTADOS.map((e) => <option key={e}>{e}</option>)}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
