import { useSearchParams } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext'
import TarjetaProducto from '../components/TarjetaProducto'

export default function Tienda() {
  const { productos } = useTienda()
  const [params, setParams] = useSearchParams()
  const marca = params.get('marca') || ''
  const q = params.get('q') || ''
  const orden = params.get('orden') || 'destacados'

  const cambiar = (clave, valor) => {
    const p = new URLSearchParams(params)
    if (valor) p.set(clave, valor)
    else p.delete(clave)
    setParams(p, { replace: true })
  }

  const activos = productos.filter((p) => p.activo)
  const marcas = [...new Set(activos.map((p) => p.marca))]

  const lista = activos
    .filter((p) => (!marca || p.marca === marca) && `${p.nombre} ${p.marca}`.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a, b) => {
      if (orden === 'menor') return a.precio - b.precio
      if (orden === 'mayor') return b.precio - a.precio
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre)
      return Number(b.destacado) - Number(a.destacado)
    })

  return (
    <div className="contenedor seccion">
      <h1 className="titulo-pagina">Zapatillas</h1>

      <div className="filtros">
        <div className="campo campo-buscar">
          <label htmlFor="buscar" className="solo-lectores">Buscar</label>
          <input id="buscar" type="search" placeholder="Buscar por nombre o marca" value={q} onChange={(e) => cambiar('q', e.target.value)} />
        </div>
        <div className="chips" role="group" aria-label="Filtrar por marca">
          <button type="button" className={`chip${!marca ? ' activo' : ''}`} onClick={() => cambiar('marca', '')}>Todas</button>
          {marcas.map((m) => (
            <button key={m} type="button" className={`chip${marca === m ? ' activo' : ''}`} onClick={() => cambiar('marca', m)}>{m}</button>
          ))}
        </div>
        <div className="campo campo-orden">
          <label htmlFor="orden" className="solo-lectores">Ordenar</label>
          <select id="orden" value={orden} onChange={(e) => cambiar('orden', e.target.value === 'destacados' ? '' : e.target.value)}>
            <option value="destacados">Destacados primero</option>
            <option value="menor">Precio: menor a mayor</option>
            <option value="mayor">Precio: mayor a menor</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>
      </div>

      {lista.length === 0 ? (
        <div className="vacio">
          <p>No hay zapatillas con esos filtros.</p>
          <button type="button" className="boton boton-oscuro" onClick={() => setParams({}, { replace: true })}>Limpiar filtros</button>
        </div>
      ) : (
        <div className="grilla">{lista.map((p) => <TarjetaProducto key={p.id} producto={p} />)}</div>
      )}
    </div>
  )
}
