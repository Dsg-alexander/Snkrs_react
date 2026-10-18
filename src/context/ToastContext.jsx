import { createContext, useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { nuevoId } from '../lib/almacen'

const Ctx = createContext(null)
export const useToast = () => useContext(Ctx)

export function ToastProvider({ children }) {
  const [avisos, setAvisos] = useState([])

  const quitar = useCallback((id) => setAvisos((a) => a.filter((x) => x.id !== id)), [])

  // tipo: 'ok' | 'error'. accion (opcional): { texto, a }
  const avisar = useCallback((mensaje, tipo = 'ok', accion) => {
    const id = nuevoId('t')
    setAvisos((a) => [...a.slice(-2), { id, mensaje, tipo, accion }])
    setTimeout(() => quitar(id), 4500)
  }, [quitar])

  return (
    <Ctx.Provider value={{ avisar }}>
      {children}
      <div className="avisos" role="status" aria-live="polite">
        {avisos.map((a) => (
          <div key={a.id} className={`aviso aviso-${a.tipo}`}>
            <span>{a.mensaje}</span>
            {a.accion && <Link to={a.accion.a} onClick={() => quitar(a.id)}>{a.accion.texto}</Link>}
            <button type="button" aria-label="Cerrar aviso" onClick={() => quitar(a.id)}>×</button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
