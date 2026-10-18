import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, esAdmin, listo } = useAuth()
  const ubicacion = useLocation()

  if (!listo) return <div className="contenedor vacio">Cargando…</div>
  if (!usuario) return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />
  if (soloAdmin && !esAdmin) {
    return (
      <div className="contenedor vacio">
        <h1>Sin acceso</h1>
        <p>Esta sección es solo para administradores.</p>
        <Link className="boton boton-oscuro" to="/">Volver al inicio</Link>
      </div>
    )
  }
  return children
}
