import { Link } from 'react-router-dom'
import { useTienda } from '../context/TiendaContext'
import { useAuth } from '../context/AuthContext'
import Zapatilla from '../components/Zapatilla'
import TarjetaProducto from '../components/TarjetaProducto'
import { MAX_CARRITO } from '../lib/datos'

export default function Home() {
  const { productos } = useTienda()
  const { usuario } = useAuth()

  const activos = productos.filter((p) => p.activo)
  const marcas = [...new Set(activos.map((p) => p.marca))]
  const conDestacado = activos.filter((p) => p.destacado)
  const destacados = (conDestacado.length ? conDestacado : activos).slice(0, 4)

  return (
    <>
      <section className="contenedor hero">
        <div className="hero-texto">
          <h1>Tu próximo par está acá.</h1>
          <p>Jordan, Michael Kors y Karl Lagerfeld. Elige tu talla, paga con tarjeta y te lo enviamos gratis.</p>
          <div className="hero-cta">
            <Link className="boton boton-primario" to="/tienda">Ver zapatillas</Link>
            {!usuario && <Link className="boton boton-claro" to="/registro">Crear cuenta</Link>}
          </div>
        </div>
        <div className="hero-escena" aria-hidden="true">
          <div className="losa" />
          <Zapatilla className="hero-zapa" color="#FFFFFF" acento="#E4189F" />
        </div>
      </section>

      <section className="contenedor seccion">
        <h2>Elige tu marca</h2>
        <div className="marcas">
          {marcas.map((m) => {
            const n = activos.filter((p) => p.marca === m).length
            return (
              <Link key={m} to={`/tienda?marca=${encodeURIComponent(m)}`} className="marca-tile">
                <span className="marca-nombre">{m}</span>
                <span className="marca-n">{n} modelo{n === 1 ? '' : 's'}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="contenedor seccion">
        <div className="seccion-cabecera">
          <h2>Destacados</h2>
          <Link to="/tienda" className="enlace">Ver todo el catálogo</Link>
        </div>
        <div className="grilla">
          {destacados.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
        </div>
      </section>

      <section className="contenedor seccion">
        <ul className="datos">
          <li><strong>Envío gratis</strong><span>A la dirección que indiques al pagar.</span></li>
          <li><strong>Tallas 7 a 9 US</strong><span>Elige la tuya en cada producto.</span></li>
          <li><strong>Hasta {MAX_CARRITO} pares por compra</strong><span>Para que alcance para todos.</span></li>
        </ul>
      </section>
    </>
  )
}
