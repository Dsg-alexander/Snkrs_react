import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ADMIN_DEMO, useAuth } from '../context/AuthContext'
import { validarEmail } from '../lib/validaciones'

export default function Login() {
  const { usuario, ingresar } = useAuth()
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()

  if (usuario) return <Navigate to={state?.desde || '/'} replace />

  const enviar = async (e) => {
    e.preventDefault()
    if (!validarEmail(email)) return setError('Escribe un correo válido.')
    if (!clave) return setError('Escribe tu contraseña.')
    setCargando(true)
    const r = await ingresar(email, clave)
    setCargando(false)
    if (!r.ok) return setError(r.error)
    navigate(state?.desde || (r.usuario.rol === 'admin' ? '/admin' : '/'), { replace: true })
  }

  return (
    <div className="contenedor auth">
      <div className="panel">
        <h1>Entrar</h1>
        {state?.desde && <p className="nota">Inicia sesión para continuar con tu compra.</p>}
        <form onSubmit={enviar} noValidate>
          <div className="campo">
            <label htmlFor="email">Correo</label>
            <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="clave">Contraseña</label>
            <input id="clave" type="password" autoComplete="current-password" value={clave} onChange={(e) => setClave(e.target.value)} />
          </div>
          {error && <p className="error-msj" role="alert">{error}</p>}
          <button type="submit" className="boton boton-primario boton-ancho" disabled={cargando}>
            {cargando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
        <p className="centrado">¿No tienes cuenta? <Link to="/registro" className="enlace">Crear cuenta</Link></p>

        <div className="demo">
          <p>Cuenta de administrador de prueba</p>
          <code>{ADMIN_DEMO.email} / {ADMIN_DEMO.clave}</code>
          <button type="button" className="boton boton-claro boton-chico" onClick={() => { setEmail(ADMIN_DEMO.email); setClave(ADMIN_DEMO.clave); setError('') }}>
            Rellenar datos
          </button>
        </div>
      </div>
    </div>
  )
}
