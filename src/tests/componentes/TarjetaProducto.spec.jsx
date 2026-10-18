import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaProducto from '../../components/TarjetaProducto'
import { productoEjemplo } from './proveedores'

const dibujar = (producto) =>
  render(<MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>)

describe('TarjetaProducto', () => {
  it('muestra nombre, marca y precio', () => {
    dibujar(productoEjemplo)
    expect(screen.getByText('Jordan Test')).toBeTruthy()
    expect(screen.getByText('Jordan')).toBeTruthy()
    expect(screen.getByText('$140')).toBeTruthy()
  })

  it('enlaza al detalle del producto', () => {
    const { container } = dibujar(productoEjemplo)
    // Se busca solo dentro de la tarjeta, así otros enlaces de la página no interfieren.
    expect(within(container).getByRole('link').getAttribute('href')).toBe('/producto/px')
  })

  it('marca como agotado solo cuando no queda stock', () => {
    const { unmount } = dibujar({ ...productoEjemplo, stock: 0 })
    expect(screen.getByText('Agotado')).toBeTruthy()
    unmount()
    dibujar(productoEjemplo)
    expect(screen.queryByText('Agotado')).toBeNull()
  })
})
