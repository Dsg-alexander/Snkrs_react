import { fireEvent, render, screen } from '@testing-library/react'
import FormularioPago from '../../components/FormularioPago'

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })

const llenarBien = () => {
  escribir('Número de tarjeta', '4111111111111111')
  escribir('Nombre del titular', 'Ana Prueba')
  escribir('Vencimiento', '1299')
  escribir('CVV', '123')
  escribir('Dirección de envío (gratis)', 'Av. Siempre Viva 742')
}

describe('FormularioPago', () => {
  it('muestra errores y no compra si el formulario está vacío', () => {
    const onComprar = jasmine.createSpy('onComprar')
    render(<FormularioPago onComprar={onComprar} />)
    fireEvent.click(screen.getByRole('button', { name: 'Pagar y comprar' }))
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(5)
    expect(onComprar).not.toHaveBeenCalled()
  })

  it('da formato al número de tarjeta y a la fecha de vencimiento', () => {
    render(<FormularioPago onComprar={jasmine.createSpy('onComprar')} />)
    escribir('Número de tarjeta', '4111111111111111')
    escribir('Vencimiento', '1299')
    expect(screen.getByLabelText('Número de tarjeta').value).toBe('4111 1111 1111 1111')
    expect(screen.getByLabelText('Vencimiento').value).toBe('12/99')
  })

  it('compra con la dirección cuando todos los datos son válidos', () => {
    const onComprar = jasmine.createSpy('onComprar')
    render(<FormularioPago onComprar={onComprar} />)
    llenarBien()
    fireEvent.click(screen.getByRole('button', { name: 'Pagar y comprar' }))
    expect(onComprar).toHaveBeenCalledWith({ direccion: 'Av. Siempre Viva 742' })
    expect(screen.queryAllByRole('alert').length).toBe(0)
  })
})
