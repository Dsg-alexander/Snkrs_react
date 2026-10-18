import { useEffect, useState } from 'react'
import Zapatilla from './Zapatilla'

export default function ImagenProducto({ producto, className }) {
  const [falla, setFalla] = useState(false)
  useEffect(() => { setFalla(false) }, [producto.imagen])

  if (!producto.imagen || falla) {
    return <Zapatilla color={producto.color} acento={producto.acento} className={className} titulo={producto.nombre} />
  }
  return (
    <img
      src={producto.imagen} alt={producto.nombre} className={className}
      loading="lazy" referrerPolicy="no-referrer" onError={() => setFalla(true)}
    />
  )
}
