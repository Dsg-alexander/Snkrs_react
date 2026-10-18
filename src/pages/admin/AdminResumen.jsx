import { Link } from 'react-router-dom'
import { useTienda } from '../../context/TiendaContext'
import { useAuth } from '../../context/AuthContext'
import { formatoFecha, formatoPrecio } from '../../lib/datos'
import { claseEstado } from './ui'

export default function AdminResumen() {
  const { productos, pedidos } = useTienda()
  const { usuarios } = useAuth()

  const validos = pedidos.filter((p) => p.estado !== 'Cancelado')
  const ingresos = validos.reduce((s, p) => s + p.total, 0)
  const pares = validos.reduce((s, p) => s + p.items.reduce((a, i) => a + i.cantidad, 0), 0)
  const stockBajo = productos.filter((p) => p.activo && p.stock <= 3)

  const porMarca = {}
  validos.forEach((p) => p.items.forEach((i) => {
    porMarca[i.marca] = (porMarca[i.marca] || 0) + i.precio * i.cantidad
  }))
  const marcas = Object.entries(porMarca).sort((a, b) => b[1] - a[1])
  const maximo = marcas.length ? marcas[0][1] : 1

  return (
    <>
      <h1 className="titulo-pagina">Resumen</h1>

      <div className="estadisticas">
        <div className="panel"><strong>{formatoPrecio(ingresos)}</strong><span>Ingresos</span></div>
        <div className="panel"><strong>{validos.length}</strong><span>Pedidos activos</span></div>
        <div className="panel"><strong>{pares}</strong><span>Pares vendidos</span></div>
        <div className="panel"><strong>{productos.filter((p) => p.activo).length}/{productos.length}</strong><span>Productos visibles</span></div>
        <div className="panel"><strong>{usuarios.length}</strong><span>Usuarios</span></div>
      </div>

      <div className="admin-dos">
        <div className="panel">
          <h2>Ventas por marca</h2>
          {marcas.length === 0 ? (
            <p className="suave">Cuando haya compras, aquí verás cuánto vende cada marca.</p>
          ) : (
            <div className="barras">
              {marcas.map(([m, v]) => (
                <div key={m} className="barra-fila">
                  <span>{m}</span>
                  <div className="barra-pista"><div className="barra-relleno" style={{ width: `${(v / maximo) * 100}%` }} /></div>
                  <strong>{formatoPrecio(v)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <h2>Stock bajo</h2>
          {stockBajo.length === 0 ? (
            <p className="suave">Todos los modelos visibles tienen más de 3 pares.</p>
          ) : (
            <ul className="lista-simple">
              {stockBajo.map((p) => (
                <li key={p.id}><span>{p.nombre}</span><span className={`pastilla ${p.stock === 0 ? 'p-error' : 'p-aviso'}`}>{p.stock === 0 ? 'Agotado' : `${p.stock} pares`}</span></li>
              ))}
            </ul>
          )}
          <Link to="/admin/productos" className="enlace">Gestionar productos</Link>
        </div>
      </div>

      <div className="panel">
        <h2>Últimos pedidos</h2>
        {pedidos.length === 0 ? (
          <p className="suave">Aún no hay pedidos.</p>
        ) : (
          <div className="tabla-scroll">
            <table className="tabla">
              <thead><tr><th>Pedido</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
              <tbody>
                {pedidos.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td><td>{formatoFecha(p.fecha)}</td><td>{p.usuarioNombre}</td>
                    <td>{formatoPrecio(p.total)}</td>
                    <td><span className={`pastilla ${claseEstado(p.estado)}`}>{p.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
