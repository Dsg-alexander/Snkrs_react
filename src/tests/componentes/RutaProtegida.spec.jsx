import { render, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import RutaProtegida from '../../components/RutaProtegida'
import { Proveedores, guardarSesion } from './proveedores'

const dibujar = (soloAdmin = false) =>
  render(
    <Proveedores ruta="/privado">
      <Routes>
        <Route path="/login" element={<p>Pantalla de login</p>} />
        <Route path="/privado" element={<RutaProtegida soloAdmin={soloAdmin}><p>Contenido privado</p></RutaProtegida>} />
      </Routes>
    </Proveedores>
  )

describe('RutaProtegida', () => {
  it('manda a iniciar sesión si no hay usuario', async () => {
    dibujar()
    expect(await screen.findByText('Pantalla de login')).toBeTruthy()
  })

  it('muestra el contenido si hay un usuario con sesión', async () => {
    guardarSesion('cliente')
    dibujar()
    expect(await screen.findByText('Contenido privado')).toBeTruthy()
  })

  it('bloquea a un cliente en las rutas solo para admin', async () => {
    guardarSesion('cliente')
    dibujar(true)
    expect(await screen.findByText('Sin acceso')).toBeTruthy()
    expect(screen.queryByText('Contenido privado')).toBeNull()
  })
})
