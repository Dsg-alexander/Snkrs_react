import { useEffect } from 'react'
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { TiendaProvider } from './context/TiendaContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RutaProtegida from './components/RutaProtegida'
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import AdminLayout from './pages/admin/AdminLayout'
import AdminResumen from './pages/admin/AdminResumen'
import AdminProductos from './pages/admin/AdminProductos'
import AdminPedidos from './pages/admin/AdminPedidos'
import AdminUsuarios from './pages/admin/AdminUsuarios'

function Plantilla() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <a href="#contenido" className="saltar">Saltar al contenido</a>
      <Navbar />
      <main id="contenido"><Outlet /></main>
      <Footer />
    </>
  )
}

function NoEncontrada() {
  return (
    <div className="contenedor vacio">
      <h1>Esta página no existe</h1>
      <Link className="boton boton-oscuro" to="/">Volver al inicio</Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <TiendaProvider>
            <Routes>
              <Route element={<Plantilla />}>
                <Route index element={<Home />} />
                <Route path="tienda" element={<Tienda />} />
                <Route path="producto/:id" element={<DetalleProducto />} />
                <Route path="carrito" element={<Carrito />} />
                <Route path="checkout" element={<RutaProtegida><Checkout /></RutaProtegida>} />
                <Route path="perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Registro />} />

                <Route path="admin" element={<RutaProtegida soloAdmin><AdminLayout /></RutaProtegida>}>
                  <Route index element={<AdminResumen />} />
                  <Route path="productos" element={<AdminProductos />} />
                  <Route path="pedidos" element={<AdminPedidos />} />
                  <Route path="usuarios" element={<AdminUsuarios />} />
                </Route>

                {/* Rutas antiguas, para que los enlaces viejos sigan funcionando */}
                <Route path="jordan" element={<Navigate to="/tienda?marca=Jordan" replace />} />
                <Route path="mk" element={<Navigate to="/tienda?marca=Michael%20Kors" replace />} />
                <Route path="karl" element={<Navigate to="/tienda?marca=Karl%20Lagerfeld" replace />} />
                <Route path="*" element={<NoEncontrada />} />
              </Route>
            </Routes>
          </TiendaProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
