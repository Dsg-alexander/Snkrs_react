import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TablaCarrito from '../../components/TablaCarrito'
import { productoEjemplo } from './proveedores'

const lineas = [
  { productoId: 'px', talla: '8', cantidad: 2, producto: productoEjemplo },
  { productoId: 'py', talla: '9', cantidad: 1, producto: { ...productoEjemplo, id: 'py', nombre: 'Karl Test', precio: 160 } },
]

const dibujar = () => {
  const fns = {
    onMas: jasmine.createSpy('onMas'),
    onMenos: jasmine.createSpy('onMenos'),
    onQuitar: jasmine.createSpy('onQuitar'),
  }
  render(<MemoryRouter><TablaCarrito lineas={lineas} {...fns} /></MemoryRouter>)
  return fns
}

describe('TablaCarrito', () => {
  it('muestra una fila por cada línea del carrito', () => {
    dibujar()
    // 1 fila de encabezado + 2 líneas
    expect(screen.getAllByRole('row').length).toBe(3)
    expect(screen.getByText('Jordan Test')).toBeTruthy()
    expect(screen.getByText('Karl Test')).toBeTruthy()
  })

  it('calcula el precio de cada línea según la cantidad', () => {
    dibujar()
    expect(screen.getByText('$280')).toBeTruthy() // 140 x 2
    expect(screen.getByText('$160')).toBeTruthy() // 160 x 1
  })

  it('avisa qué producto y talla se suma, resta o quita', () => {
    const { onMas, onMenos, onQuitar } = dibujar()
    fireEvent.click(screen.getAllByLabelText('Agregar una unidad')[0])
    fireEvent.click(screen.getAllByLabelText('Quitar una unidad')[0])
    fireEvent.click(screen.getAllByText('Quitar', { selector: 'button' })[1])
    expect(onMas).toHaveBeenCalledWith('px', '8')
    expect(onMenos).toHaveBeenCalledWith('px', '8')
    expect(onQuitar).toHaveBeenCalledWith('py', '9')
  })
})
