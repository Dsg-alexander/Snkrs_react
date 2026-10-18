import { createContext, useContext, useEffect, useState } from 'react'
import { leer, guardar, nuevoId } from '../lib/almacen'
import { hashClave } from '../lib/seguridad'

const K_USUARIOS = 'snkrs_usuarios'
const K_SESION = 'snkrs_sesion'

export const ADMIN_DEMO = { email: 'admin@snkrs.cl', clave: 'Admin123' }

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => leer(K_USUARIOS, []))
  const [sesionId, setSesionId] = useState(() => leer(K_SESION, null))
  const [listo, setListo] = useState(false)

  useEffect(() => { guardar(K_USUARIOS, usuarios) }, [usuarios])
  useEffect(() => { guardar(K_SESION, sesionId) }, [sesionId])

  // Crea la cuenta de administrador de demostración la primera vez.
  useEffect(() => {
    (async () => {
      if (leer(K_USUARIOS, []).length === 0) {
        setUsuarios([{
          id: 'u-admin', nombre: 'Administrador', email: ADMIN_DEMO.email,
          clave: await hashClave(ADMIN_DEMO.email, ADMIN_DEMO.clave),
          rol: 'admin', creado: new Date().toISOString(),
        }])
      }
      setListo(true)
    })()
  }, [])

  const usuario = usuarios.find((u) => u.id === sesionId) || null
  const esAdmin = usuario?.rol === 'admin'

  const registrar = async ({ nombre, email, clave }) => {
    const correo = email.trim().toLowerCase()
    if (usuarios.some((u) => u.email === correo)) {
      return { ok: false, error: 'Ya existe una cuenta con ese correo.' }
    }
    const nuevo = {
      id: nuevoId('u'), nombre: nombre.trim(), email: correo,
      clave: await hashClave(correo, clave), rol: 'cliente', creado: new Date().toISOString(),
    }
    setUsuarios((u) => [...u, nuevo])
    setSesionId(nuevo.id)
    return { ok: true, usuario: nuevo }
  }

  const ingresar = async (email, clave) => {
    const correo = email.trim().toLowerCase()
    const encontrado = usuarios.find((u) => u.email === correo)
    if (!encontrado || encontrado.clave !== (await hashClave(correo, clave))) {
      return { ok: false, error: 'Correo o contraseña incorrectos.' }
    }
    setSesionId(encontrado.id)
    return { ok: true, usuario: encontrado }
  }

  const salir = () => setSesionId(null)

  const cambiarRol = (id, rol) => {
    const objetivo = usuarios.find((u) => u.id === id)
    const admins = usuarios.filter((u) => u.rol === 'admin').length
    if (objetivo?.rol === 'admin' && rol !== 'admin' && admins <= 1) {
      return { ok: false, error: 'Debe quedar al menos un administrador.' }
    }
    setUsuarios((us) => us.map((u) => (u.id === id ? { ...u, rol } : u)))
    return { ok: true }
  }

  const eliminarUsuario = (id) => {
    const objetivo = usuarios.find((u) => u.id === id)
    const admins = usuarios.filter((u) => u.rol === 'admin').length
    if (id === sesionId) return { ok: false, error: 'No puedes eliminar tu propia cuenta.' }
    if (objetivo?.rol === 'admin' && admins <= 1) {
      return { ok: false, error: 'Debe quedar al menos un administrador.' }
    }
    setUsuarios((us) => us.filter((u) => u.id !== id))
    return { ok: true }
  }

  return (
    <Ctx.Provider value={{ usuarios, usuario, esAdmin, listo, registrar, ingresar, salir, cambiarRol, eliminarUsuario }}>
      {children}
    </Ctx.Provider>
  )
}
