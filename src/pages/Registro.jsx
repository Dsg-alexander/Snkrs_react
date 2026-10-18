import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validarEmail, validarNombre } from '../lib/validaciones'

export default function Registro() {
  const { usuario, registrar } = useAuth()
  const [f, setF] = useState({ nombre: '', email: '', clave: '', repetir: '' })
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  if (usuario) return <Navigate to="/" replace />

  const set = (k) => (e) => {
    setF((x) => ({ ...x, [k]: e.target.value }))
    setErrores((er) => ({ ...er, [k]: undefined }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    const er = {}
    if (!validarNombre(f.nombre)) er.nombre = 'Escribe tu nombre (mínimo 3 letras).'
    if (!validarEmail(f.email)) er.email = 'Escribe un correo válido.'
    if (f.clave.length < 6) er.clave = 'La contraseña debe tener al menos 6 caracteres.'
    if (f.repetir !== f.clave) er.repetir = 'Las contraseñas no coinciden.'
    setErrores(er)
    if (Object.keys(er).length) return
    setCargando(true)
    const r = await registrar(f)
    setCargando(false)
    if (!r.ok) return setErrores({ email: r.error })
    navigate('/', { replace: true })
  }

  const campo = (id, etiqueta, tipo, auto) => (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      <input id={id} type={tipo} autoComplete={auto} value={f[id]} onChange={set(id)} aria-invalid={!!errores[id]} />
      {errores[id] && <small className="error-msj" role="alert">{errores[id]}</small>}
    </div>
  )

  return (
    <div className="contenedor auth">
      <div className="panel">
        <h1>Crear cuenta</h1>
        <form onSubmit={enviar} noValidate>
          {campo('nombre', 'Nombre', 'text', 'name')}
          {campo('email', 'Correo', 'email', 'email')}
          {campo('clave', 'Contraseña', 'password', 'new-password')}
          {campo('repetir', 'Repite la contraseña', 'password', 'new-password')}
          <button type="submit" className="boton boton-primario boton-ancho" disabled={cargando}>
            {cargando ? 'Creando…' : 'Crear cuenta'}
          </button>
        </form>
        <p className="centrado">¿Ya tienes cuenta? <Link to="/login" className="enlace">Entrar</Link></p>
      </div>
    </div>
  )
}
