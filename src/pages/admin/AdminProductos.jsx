import { useEffect, useState } from 'react'
import { useTienda } from '../../context/TiendaContext'
import { useToast } from '../../context/ToastContext'
import ImagenProducto from '../../components/ImagenProducto'
import { TALLAS, formatoPrecio } from '../../lib/datos'

const vacio = {
  nombre: '', marca: '', precio: '', stock: '', imagen: '', color: '#4429F2', acento: '#FFFFFF',
  descripcion: '', tallas: TALLAS, destacado: false, activo: true,
}

function FormProducto({ inicial, marcas, onGuardar, onCerrar }) {
  const [f, setF] = useState(() =>
    inicial ? { ...inicial, precio: String(inicial.precio), stock: String(inicial.stock) } : vacio
  )
  const [err, setErr] = useState({})
  const set = (k, v) => {
    setF((x) => ({ ...x, [k]: v }))
    setErr((e) => ({ ...e, [k]: undefined }))
  }

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCerrar()
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [onCerrar])

  const alternarTalla = (t) =>
    set('tallas', TALLAS.filter((x) => (x === t ? !f.tallas.includes(t) : f.tallas.includes(x))))

  const enviar = (e) => {
    e.preventDefault()
    const er = {}
    const precio = Number(f.precio)
    const stock = Number(f.stock)
    if (f.nombre.trim().length < 3) er.nombre = 'Escribe un nombre de al menos 3 letras.'
    if (!f.marca.trim()) er.marca = 'Indica la marca.'
    if (!(precio > 0)) er.precio = 'El precio debe ser mayor a 0.'
    if (f.stock === '' || !Number.isInteger(stock) || stock < 0) er.stock = 'El stock debe ser un número entero, 0 o más.'
    if (f.imagen.trim() && !/^https?:\/\//i.test(f.imagen.trim())) er.imagen = 'La URL debe empezar con http:// o https://.'
    if (f.tallas.length === 0) er.tallas = 'Elige al menos una talla.'
    setErr(er)
    if (Object.keys(er).length) return
    onGuardar({
      ...f, nombre: f.nombre.trim(), marca: f.marca.trim(), precio, stock,
      imagen: f.imagen.trim(), descripcion: f.descripcion.trim(),
    })
  }

  const texto = (id, etiqueta, extra = {}) => (
    <div className="campo">
      <label htmlFor={`f-${id}`}>{etiqueta}</label>
      <input id={`f-${id}`} value={f[id]} onChange={(e) => set(id, e.target.value)} aria-invalid={!!err[id]} {...extra} />
      {err[id] && <small className="error-msj" role="alert">{err[id]}</small>}
    </div>
  )

  return (
    <div className="velo" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal-caja" role="dialog" aria-modal="true" aria-labelledby="titulo-form">
        <h2 id="titulo-form">{inicial ? 'Editar producto' : 'Nuevo producto'}</h2>
        <form onSubmit={enviar} noValidate>
          <div className="form-producto">
            <div>
              {texto('nombre', 'Nombre', { autoFocus: true })}
              <div className="campo">
                <label htmlFor="f-marca">Marca</label>
                <input id="f-marca" list="lista-marcas" value={f.marca} onChange={(e) => set('marca', e.target.value)} aria-invalid={!!err.marca} />
                <datalist id="lista-marcas">{marcas.map((m) => <option key={m} value={m} />)}</datalist>
                {err.marca && <small className="error-msj" role="alert">{err.marca}</small>}
              </div>
              <div className="fila-2">
                {texto('precio', 'Precio', { type: 'number', min: 1, step: 1, inputMode: 'numeric' })}
                {texto('stock', 'Stock (pares)', { type: 'number', min: 0, step: 1, inputMode: 'numeric' })}
              </div>
              {texto('imagen', 'URL de la imagen (opcional)', { placeholder: 'https://…' })}
              <div className="fila-2">
                <div className="campo"><label htmlFor="f-color">Color principal</label><input id="f-color" type="color" value={f.color} onChange={(e) => set('color', e.target.value)} /></div>
                <div className="campo"><label htmlFor="f-acento">Color de detalle</label><input id="f-acento" type="color" value={f.acento} onChange={(e) => set('acento', e.target.value)} /></div>
              </div>
            </div>

            <div>
              <div className="vista-previa"><ImagenProducto producto={{ ...f, nombre: f.nombre || 'Vista previa' }} /></div>
              <p className="nota">Sin imagen, se muestra esta ilustración con los dos colores elegidos.</p>
            </div>
          </div>

          <div className="campo">
            <label htmlFor="f-descripcion">Descripción</label>
            <textarea id="f-descripcion" rows="3" value={f.descripcion} onChange={(e) => set('descripcion', e.target.value)} />
          </div>

          <fieldset className="tallas">
            <legend>Tallas disponibles (US)</legend>
            <div className="tallas-lista">
              {TALLAS.map((t) => (
                <button key={t} type="button" className={`talla${f.tallas.includes(t) ? ' elegida' : ''}`} aria-pressed={f.tallas.includes(t)} onClick={() => alternarTalla(t)}>{t}</button>
              ))}
            </div>
            {err.tallas && <small className="error-msj" role="alert">{err.tallas}</small>}
          </fieldset>

          <div className="checks">
            <label><input type="checkbox" checked={f.activo} onChange={(e) => set('activo', e.target.checked)} /> Visible en la tienda</label>
            <label><input type="checkbox" checked={f.destacado} onChange={(e) => set('destacado', e.target.checked)} /> Mostrar en destacados</label>
          </div>

          <div className="modal-acciones">
            <button type="button" className="boton boton-claro" onClick={onCerrar}>Cancelar</button>
            <button type="submit" className="boton boton-primario">{inicial ? 'Guardar cambios' : 'Crear producto'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminProductos() {
  const { productos, guardarProducto, eliminarProducto, alternarActivo } = useTienda()
  const { avisar } = useToast()
  const [editando, setEditando] = useState(null) // null = cerrado, {} = nuevo, objeto = editar
  const [confirmando, setConfirmando] = useState(null)
  const [q, setQ] = useState('')

  const marcas = [...new Set(productos.map((p) => p.marca))]
  const lista = productos.filter((p) => `${p.nombre} ${p.marca}`.toLowerCase().includes(q.trim().toLowerCase()))

  const guardar = (datos) => {
    guardarProducto(datos)
    avisar(datos.id ? 'Producto actualizado.' : 'Producto creado.')
    setEditando(null)
  }

  const borrar = (p) => {
    eliminarProducto(p.id)
    setConfirmando(null)
    avisar(`Se eliminó ${p.nombre}.`)
  }

  return (
    <>
      <div className="seccion-cabecera">
        <h1 className="titulo-pagina">Productos</h1>
        <button type="button" className="boton boton-primario" onClick={() => setEditando({})}>Nuevo producto</button>
      </div>

      <div className="campo campo-buscar">
        <label htmlFor="q-prod" className="solo-lectores">Buscar producto</label>
        <input id="q-prod" type="search" placeholder="Buscar por nombre o marca" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="tabla-scroll">
        <table className="tabla">
          <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Estado</th><th><span className="solo-lectores">Acciones</span></th></tr></thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="celda-producto">
                    <span className="mini"><ImagenProducto producto={p} /></span>
                    <span><strong>{p.nombre}</strong><small>{p.marca}{p.destacado ? ', destacado' : ''}</small></span>
                  </div>
                </td>
                <td>{formatoPrecio(p.precio)}</td>
                <td><span className={`pastilla ${p.stock === 0 ? 'p-error' : p.stock <= 3 ? 'p-aviso' : 'p-neutra'}`}>{p.stock}</span></td>
                <td>
                  <button type="button" className={`pastilla pastilla-boton ${p.activo ? 'p-ok' : 'p-neutra'}`} onClick={() => alternarActivo(p.id)} aria-label={p.activo ? 'Ocultar de la tienda' : 'Mostrar en la tienda'}>
                    {p.activo ? 'Visible' : 'Oculto'}
                  </button>
                </td>
                <td className="acciones">
                  {confirmando === p.id ? (
                    <>
                      <span>¿Eliminar?</span>
                      <button type="button" className="enlace-peligro" onClick={() => borrar(p)}>Sí, eliminar</button>
                      <button type="button" className="enlace" onClick={() => setConfirmando(null)}>No</button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="enlace" onClick={() => setEditando(p)}>Editar</button>
                      <button type="button" className="enlace-peligro" onClick={() => setConfirmando(p.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {lista.length === 0 && <tr><td colSpan="5" className="suave">No hay productos con esa búsqueda.</td></tr>}
          </tbody>
        </table>
      </div>

      {editando && (
        <FormProducto
          inicial={editando.id ? editando : null} marcas={marcas}
          onGuardar={guardar} onCerrar={() => setEditando(null)}
        />
      )}
    </>
  )
}
