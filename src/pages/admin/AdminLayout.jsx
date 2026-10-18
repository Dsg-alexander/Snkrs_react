import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="contenedor admin">
      <aside className="admin-menu">
        <p className="admin-titulo">Administración</p>
        <nav aria-label="Panel de administración">
          <NavLink to="/admin" end>Resumen</NavLink>
          <NavLink to="/admin/productos">Productos</NavLink>
          <NavLink to="/admin/pedidos">Pedidos</NavLink>
          <NavLink to="/admin/usuarios">Usuarios</NavLink>
        </nav>
      </aside>
      <section className="admin-contenido"><Outlet /></section>
    </div>
  )
}
