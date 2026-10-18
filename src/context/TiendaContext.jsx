import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { leer, guardar, nuevoId } from '../lib/almacen'
import { MAX_CARRITO, productosIniciales } from '../lib/datos'

const K_PRODUCTOS = 'snkrs_productos'
const K_CARRITO = 'snkrs_carrito'
const K_PEDIDOS = 'snkrs_pedidos'

const Ctx = createContext(null)
export const useTienda = () => useContext(Ctx)

const sumar = (lista, campo) => lista.reduce((s, x) => s + x[campo], 0)

export function TiendaProvider({ children }) {
  const [productos, setProductos] = useState(() => leer(K_PRODUCTOS, productosIniciales))
  const [carrito, setCarrito] = useState(() => leer(K_CARRITO, []))
  const [pedidos, setPedidos] = useState(() => leer(K_PEDIDOS, []))

  useEffect(() => { guardar(K_PRODUCTOS, productos) }, [productos])
  useEffect(() => { guardar(K_CARRITO, carrito) }, [carrito])
  useEffect(() => { guardar(K_PEDIDOS, pedidos) }, [pedidos])

  // Líneas del carrito con su producto (se ignoran los productos ocultos o eliminados).
  const lineas = useMemo(
    () =>
      carrito
        .map((i) => ({ ...i, producto: productos.find((p) => p.id === i.productoId) }))
        .filter((l) => l.producto && l.producto.activo),
    [carrito, productos]
  )
  const unidades = sumar(lineas, 'cantidad')
  const subtotal = lineas.reduce((s, l) => s + l.cantidad * l.producto.precio, 0)

  // ---------- Carrito ----------
  const agregar = (productoId, talla) => {
    const p = productos.find((x) => x.id === productoId)
    if (!p || !p.activo) return { ok: false, error: 'Esta zapatilla ya no está disponible.' }
    if (unidades >= MAX_CARRITO) {
      return { ok: false, error: `Solo puedes llevar ${MAX_CARRITO} pares por compra.` }
    }
    const delModelo = sumar(lineas.filter((l) => l.productoId === productoId), 'cantidad')
    if (delModelo + 1 > p.stock) return { ok: false, error: 'No queda más stock de este modelo.' }
    setCarrito((c) => {
      const i = c.findIndex((x) => x.productoId === productoId && x.talla === talla)
      if (i >= 0) return c.map((x, j) => (j === i ? { ...x, cantidad: x.cantidad + 1 } : x))
      return [...c, { productoId, talla, cantidad: 1 }]
    })
    return { ok: true }
  }

  const restar = (productoId, talla) =>
    setCarrito((c) =>
      c
        .map((x) => (x.productoId === productoId && x.talla === talla ? { ...x, cantidad: x.cantidad - 1 } : x))
        .filter((x) => x.cantidad > 0)
    )

  const quitar = (productoId, talla) =>
    setCarrito((c) => c.filter((x) => !(x.productoId === productoId && x.talla === talla)))

  // ---------- Compra ----------
  const crearPedido = (usuario, direccion) => {
    if (lineas.length === 0) return { ok: false, error: 'Tu carrito está vacío.' }
    for (const l of lineas) {
      const total = sumar(lineas.filter((x) => x.productoId === l.productoId), 'cantidad')
      if (total > l.producto.stock) return { ok: false, error: `No hay stock suficiente de ${l.producto.nombre}.` }
    }
    const n = pedidos.reduce((m, p) => Math.max(m, parseInt(p.id.slice(4), 10) || 0), 1000) + 1
    const pedido = {
      id: `PED-${n}`,
      usuarioId: usuario.id,
      usuarioNombre: usuario.nombre,
      direccion: direccion.trim(),
      items: lineas.map((l) => ({
        productoId: l.productoId, nombre: l.producto.nombre, marca: l.producto.marca,
        talla: l.talla, cantidad: l.cantidad, precio: l.producto.precio,
      })),
      total: subtotal,
      estado: 'Pagado',
      fecha: new Date().toISOString(),
    }
    setProductos((ps) =>
      ps.map((p) => {
        const vendido = sumar(lineas.filter((l) => l.productoId === p.id), 'cantidad')
        return vendido ? { ...p, stock: p.stock - vendido } : p
      })
    )
    setPedidos((ps) => [pedido, ...ps])
    setCarrito([])
    return { ok: true, pedido }
  }

  // ---------- Administración ----------
  const guardarProducto = (datos) => {
    if (datos.id) {
      setProductos((ps) => ps.map((p) => (p.id === datos.id ? { ...p, ...datos } : p)))
    } else {
      setProductos((ps) => [...ps, { ...datos, id: nuevoId('p') }])
    }
  }

  const eliminarProducto = (id) => setProductos((ps) => ps.filter((p) => p.id !== id))

  const alternarActivo = (id) =>
    setProductos((ps) => ps.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p)))

  const cambiarEstado = (id, estado) => {
    const pedido = pedidos.find((p) => p.id === id)
    if (!pedido || pedido.estado === 'Cancelado') return
    setPedidos((ps) => ps.map((p) => (p.id === id ? { ...p, estado } : p)))
    if (estado === 'Cancelado') {
      // Al cancelar, el stock vuelve a la tienda.
      setProductos((ps) =>
        ps.map((p) => {
          const devuelto = sumar(pedido.items.filter((i) => i.productoId === p.id), 'cantidad')
          return devuelto ? { ...p, stock: p.stock + devuelto } : p
        })
      )
    }
  }

  return (
    <Ctx.Provider
      value={{
        productos, pedidos, lineas, unidades, subtotal,
        agregar, restar, quitar, crearPedido,
        guardarProducto, eliminarProducto, alternarActivo, cambiarEstado,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
