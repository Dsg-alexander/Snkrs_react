import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import ImagenProducto from '../components/ImagenProducto'
import TarjetaProducto from '../components/TarjetaProducto'
import { TALLAS, formatoPrecio } from '../lib/datos'

export default function DetalleProducto() {
  const { id } = useParams()
  const { productos, agregar } = useTienda()
  const { esAdmin } = useAuth()
  const { avisar } = useToast()
  const [talla, setTalla] = useState('')

  const p = productos.find((x) => x.id === id)
  if (!p || (!p.activo && !esAdmin)) {
    return (
      <div className="contenedor vacio">
        <h1>No encontramos esa zapatilla</h1>
        <p>Puede que ya no esté disponible.</p>
        <Link className="boton boton-oscuro" to="/tienda">Ver la tienda</Link>
      </div>
    )
  }

  const agotado = p.stock <= 0
  const tallas = p.tallas?.length ? p.tallas : TALLAS
  const relacionados = productos.filter((x) => x.activo && x.marca === p.marca && x.id !== p.id).slice(0, 3)

  const agregarAlCarrito = () => {
    const r = agregar(p.id, talla)
    if (r.ok) avisar(`${p.nombre}, talla ${talla}, agregado al carrito.`, 'ok', { texto: 'Ver carrito', a: '/carrito' })
    else avisar(r.error, 'error')
  }

  return (
    <div className="contenedor seccion">
      <Link to="/tienda" className="enlace volver">Volver a la tienda</Link>

      <div className="detalle">
        <div className="detalle-img"><ImagenProducto producto={p} /></div>

        <div className="detalle-info">
          <Link to={`/tienda?marca=${encodeURIComponent(p.marca)}`} className="tarjeta-marca">{p.marca}</Link>
          <h1>{p.nombre}</h1>
          <p className="detalle-precio">{formatoPrecio(p.precio)}</p>
          {p.descripcion && <p className="detalle-desc">{p.descripcion}</p>}
          {!p.activo && <p className="nota">Este producto está oculto: solo lo ves tú como administrador.</p>}

          <fieldset className="tallas">
            <legend>Talla (US)</legend>
            <div className="tallas-lista">
              {tallas.map((t) => (
                <button
                  key={t} type="button" className={`talla${talla === t ? ' elegida' : ''}`}
                  aria-pressed={talla === t} onClick={() => setTalla(t)} disabled={agotado}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <p className={`stock${p.stock > 0 && p.stock <= 3 ? ' poco' : ''}`}>
            {agotado ? 'Agotado por ahora.' : p.stock <= 3 ? `Quedan solo ${p.stock} pares.` : 'Disponible para enviar.'}
          </p>

          <button type="button" className="boton boton-primario boton-ancho" disabled={agotado || !talla} onClick={agregarAlCarrito}>
            {agotado ? 'Agotado' : talla ? 'Agregar al carrito' : 'Elige una talla'}
          </button>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="seccion">
          <h2>Más de {p.marca}</h2>
          <div className="grilla">{relacionados.map((r) => <TarjetaProducto key={r.id} producto={r} />)}</div>
        </section>
      )}
    </div>
  )
}
