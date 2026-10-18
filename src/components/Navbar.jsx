import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTienda } from '../context/TiendaContext'

export default function Navbar() {
  const { usuario, esAdmin, salir } = useAuth()
  const { unidades } = useTienda()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [cuentaAbierta, setCuentaAbierta] = useState(false)
  const cuentaRef = useRef(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMenuAbierto(false)
    setCuentaAbierta(false)
  }, [pathname])

  useEffect(() => {
    const cerrar = (e) => {
      if (cuentaRef.current && !cuentaRef.current.contains(e.target)) setCuentaAbierta(false)
    }
    document.addEventListener('mousedown', cerrar)
    return () => document.removeEventListener('mousedown', cerrar)
  }, [])

  const cerrarSesion = () => {
    salir()
    navigate('/')
  }

  return (
    <header className="barra">
      <div className="contenedor barra-in">
        <Link to="/" className="logo" aria-label="Snkrs, inicio">snkrs<span>.</span></Link>

        <nav className={`menu-principal${menuAbierto ? ' abierto' : ''}`} aria-label="Principal">
          <NavLink to="/tienda">Tienda</NavLink>
          {esAdmin && <NavLink to="/admin">Panel admin</NavLink>}
        </nav>

        <div className="barra-acciones">
          <Link to="/carrito" className="boton-carrito" aria-label={`Carrito, ${unidades} productos`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {unidades > 0 && <span className="cuenta">{unidades}</span>}
          </Link>

          {usuario ? (
            <div className="cuenta-menu" ref={cuentaRef}>
              <button
                type="button" className="avatar" aria-haspopup="menu" aria-expanded={cuentaAbierta}
                onClick={() => setCuentaAbierta((a) => !a)} title={usuario.nombre}
              >
                {usuario.nombre.charAt(0).toUpperCase()}
              </button>
              {cuentaAbierta && (
                <div className="cuenta-lista" role="menu">
                  <p>{usuario.nombre}<small>{usuario.email}</small></p>
                  <Link to="/perfil" role="menuitem">Mis pedidos</Link>
                  {esAdmin && <Link to="/admin" role="menuitem">Panel de administración</Link>}
                  <button type="button" role="menuitem" onClick={cerrarSesion}>Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="boton boton-claro boton-chico">Entrar</Link>
          )}

          <button
            type="button" className="hamburguesa" aria-label="Abrir menú"
            aria-expanded={menuAbierto} onClick={() => setMenuAbierto((m) => !m)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
