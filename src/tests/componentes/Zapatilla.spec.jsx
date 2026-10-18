import { render, screen } from '@testing-library/react'
import Zapatilla from '../../components/Zapatilla'

describe('Zapatilla', () => {
  it('se muestra como imagen accesible con el texto por defecto', () => {
    render(<Zapatilla />)
    expect(screen.getByRole('img', { name: 'Zapatilla' })).toBeTruthy()
  })

  it('usa el título indicado como texto accesible', () => {
    render(<Zapatilla titulo="Jordan Sneak" />)
    expect(screen.getByRole('img', { name: 'Jordan Sneak' })).toBeTruthy()
  })

  it('aplica el color principal y el de detalle', () => {
    const { container } = render(<Zapatilla color="#ff0000" acento="#00ff00" />)
    expect(container.querySelector('path[fill="#ff0000"]')).not.toBeNull()
    expect(container.querySelector('path[fill="#00ff00"]')).not.toBeNull()
  })
})
