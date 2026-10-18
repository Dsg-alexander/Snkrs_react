import { render, screen } from '@testing-library/react'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('se muestra como pie de página', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeTruthy()
  })

  it('muestra el texto de derechos reservados', () => {
    render(<Footer />)
    expect(screen.getByText(/Todos los derechos reservados/)).toBeTruthy()
  })

  it('lista a los tres integrantes', () => {
    render(<Footer />)
    const texto = screen.getByRole('contentinfo').textContent
    expect(texto).toContain('Benjamin Saavedra')
    expect(texto).toContain('Diego Santibañez')
    expect(texto).toContain('Victor Espionoza')
  })
})
