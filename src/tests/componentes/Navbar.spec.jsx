import { render, screen } from '@testing-library/react'
import Navbar from '../../components/Navbar'
import { Proveedores, guardarSesion } from './proveedores'

const dibujar = () => render(<Proveedores><Navbar /></Proveedores>)

describe('Navbar', () => {
  it('ofrece "Entrar" cuando no hay sesión', async () => {
    dibujar()
    expect(await screen.findByRole('link', { name: 'Entrar' })).toBeTruthy()
    expect(screen.queryByTitle('Ana Prueba')).toBeNull()
  })

  it('muestra la cantidad de pares que hay en el carrito', async () => {
    localStorage.setItem('snkrs_carrito', JSON.stringify([{ productoId: 'p1', talla: '8', cantidad: 2 }]))
    dibujar()
    expect(await screen.findByRole('link', { name: 'Carrito, 2 productos' })).toBeTruthy()
  })

  it('muestra el enlace al panel solo a los administradores', async () => {
    guardarSesion('admin')
    const { unmount } = dibujar()
    expect(await screen.findByRole('link', { name: 'Panel admin' })).toBeTruthy()
    unmount()
    localStorage.clear()
    guardarSesion('cliente')
    dibujar()
    expect(await screen.findByTitle('Ana Prueba')).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Panel admin' })).toBeNull()
  })
})
