import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Producto from './components/Producto'
import Footer from './components/Footer'

function App() {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
    if (carrito.length >= 4) {
      alert('Limite alcanzado: Solo puedes agregar un máximo de 4 artículos al carrito.')
      return false
    }
    setCarrito([...carrito, producto])
    alert('Tallas seleccionadas: ' + producto.talla + ' Agregado al carrito Con exito')
    return true
  }

  const comprar = () => {
    alert('Comprado Con exito')
  }

  return (
    <BrowserRouter>
      <div className="fondo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/jordan" 
            element={
              <Producto 
                nombre="Jordan Sneak" 
                precio={140} 
                imagen="https://cdnx.jumpseller.com/buon-gusto/image/78041471/thumb/1079/1079?1782061369"
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
                comprar={comprar}
              />
            } 
          />
          <Route 
            path="/mk" 
            element={
              <Producto 
                nombre="Michael Kors Sneak" 
                precio={120} 
                imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_uHs6rwoQu9swCEFPJ2F9cAK82md6k0-8BR0SgbpbIJ0DlyCmW8Ufwsw&s=10"
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
                comprar={comprar}
              />
            } 
          />
          <Route 
            path="/karl" 
            element={
              <Producto 
                nombre="Karl Lagerfeld Sneak" 
                precio={160} 
                imagen="https://cdnx.jumpseller.com/buon-gusto/image/65473986/IMG_3424.jpeg?1752794441"
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
                comprar={comprar}
              />
            } 
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
