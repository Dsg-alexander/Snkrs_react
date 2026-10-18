import { MemoryRouter } from 'react-router-dom'
import { ToastProvider } from '../../context/ToastContext'
import { AuthProvider } from '../../context/AuthContext'
import { TiendaProvider } from '../../context/TiendaContext'

// Envuelve un componente con router y contextos, igual que en App.jsx.
export function Proveedores({ children, ruta = '/' }) {
  return (
    <MemoryRouter initialEntries={[ruta]}>
      <ToastProvider>
        <AuthProvider>
          <TiendaProvider>{children}</TiendaProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>
  )
}

export const guardarSesion = (rol) => {
  localStorage.setItem(
    'snkrs_usuarios',
    JSON.stringify([{ id: 'u1', nombre: 'Ana Prueba', email: 'ana@test.cl', clave: 'x', rol, creado: '2026-01-01T00:00:00.000Z' }])
  )
  localStorage.setItem('snkrs_sesion', JSON.stringify('u1'))
}

export const productoEjemplo = {
  id: 'px', nombre: 'Jordan Test', marca: 'Jordan', precio: 140, stock: 5,
  imagen: '', color: '#ff0000', acento: '#00ff00', activo: true, destacado: false,
}

// Cada prueba parte con el almacenamiento vacío.
beforeEach(() => {
  localStorage.clear()
})
