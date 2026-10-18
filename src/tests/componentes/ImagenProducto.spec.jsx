import { fireEvent, render, screen } from '@testing-library/react'
import ImagenProducto from '../../components/ImagenProducto'
import { productoEjemplo } from './proveedores'

describe('ImagenProducto', () => {
  it('muestra la ilustración cuando el producto no tiene imagen', () => {
    const { container } = render(<ImagenProducto producto={productoEjemplo} />)
    expect(container.querySelector('svg')).not.toBeNull()
    expect(container.querySelector('img')).toBeNull()
  })

  it('muestra la foto cuando hay una URL de imagen', () => {
    render(<ImagenProducto producto={{ ...productoEjemplo, imagen: 'https://ejemplo.cl/zapa.jpg' }} />)
    const img = screen.getByRole('img', { name: 'Jordan Test' })
    expect(img.getAttribute('src')).toBe('https://ejemplo.cl/zapa.jpg')
  })

  it('vuelve a la ilustración si la foto no carga', () => {
    const { container } = render(<ImagenProducto producto={{ ...productoEjemplo, imagen: 'https://ejemplo.cl/rota.jpg' }} />)
    fireEvent.error(container.querySelector('img'))
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('svg')).not.toBeNull()
  })
})
