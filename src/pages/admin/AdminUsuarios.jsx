import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { formatoFecha } from '../../lib/datos'

export default function AdminUsuarios() {
  const { usuarios, usuario, cambiarRol, eliminarUsuario } = useAuth()
  const { avisar } = useToast()
  const [confirmando, setConfirmando] = useState(null)

  const rol = (u, nuevo) => {
    const r = cambiarRol(u.id, nuevo)
    avisar(r.ok ? `${u.nombre} ahora es ${nuevo}.` : r.error, r.ok ? 'ok' : 'error')
  }

  const borrar = (u) => {
    const r = eliminarUsuario(u.id)
    setConfirmando(null)
    avisar(r.ok ? `Se eliminó la cuenta de ${u.nombre}.` : r.error, r.ok ? 'ok' : 'error')
  }

  return (
    <>
      <h1 className="titulo-pagina">Usuarios</h1>
      <div className="tabla-scroll">
        <table className="tabla">
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Registro</th><th><span className="solo-lectores">Acciones</span></th></tr></thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td><strong>{u.nombre}</strong>{u.id === usuario.id && <small className="bloque">Tú</small>}</td>
                <td>{u.email}</td>
                <td>
                  <select className="select-estado" value={u.rol} onChange={(e) => rol(u, e.target.value)} aria-label={`Rol de ${u.nombre}`}>
                    <option value="cliente">cliente</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>{formatoFecha(u.creado)}</td>
                <td className="acciones">
                  {confirmando === u.id ? (
                    <>
                      <span>¿Eliminar?</span>
                      <button type="button" className="enlace-peligro" onClick={() => borrar(u)}>Sí, eliminar</button>
                      <button type="button" className="enlace" onClick={() => setConfirmando(null)}>No</button>
                    </>
                  ) : (
                    <button type="button" className="enlace-peligro" onClick={() => setConfirmando(u.id)}>Eliminar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
