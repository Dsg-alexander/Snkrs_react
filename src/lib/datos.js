export const MAX_CARRITO = 4
export const TALLAS = ['7', '7.5', '8', '8.5', '9']
export const ESTADOS = ['Pagado', 'Enviado', 'Entregado', 'Cancelado']

export const formatoPrecio = (n) => `$${Number(n).toLocaleString('es-CL')}`

export const formatoFecha = (iso) =>
  new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })

// Catálogo inicial. Desde el panel de administración se puede editar todo.
// Si la URL de una imagen falla, se muestra una ilustración con los colores indicados.
export const productosIniciales = [
  {
    id: 'p1', nombre: 'Jordan Sneak', marca: 'Jordan', precio: 140, stock: 10,
    imagen: 'https://cdnx.jumpseller.com/buon-gusto/image/78041471/thumb/1079/1079?1782061369',
    color: '#D7263D', acento: '#17133A', destacado: true, activo: true, tallas: TALLAS,
    descripcion: 'Zapatilla urbana de caña baja, suela de goma y calce regular.',
  },
  {
    id: 'p2', nombre: 'Michael Kors Sneak', marca: 'Michael Kors', precio: 120, stock: 8,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_uHs6rwoQu9swCEFPJ2F9cAK82md6k0-8BR0SgbpbIJ0DlyCmW8Ufwsw&s=10',
    color: '#C9A66B', acento: '#17133A', destacado: true, activo: true, tallas: TALLAS,
    descripcion: 'Diseño limpio con detalles dorados, pensada para el día a día.',
  },
  {
    id: 'p3', nombre: 'Karl Lagerfeld Sneak', marca: 'Karl Lagerfeld', precio: 160, stock: 6,
    imagen: 'https://cdnx.jumpseller.com/buon-gusto/image/65473986/IMG_3424.jpeg?1752794441',
    color: '#2B2650', acento: '#FFFFFF', destacado: true, activo: true, tallas: TALLAS,
    descripcion: 'Silueta oscura con contraste blanco. Se nota sin gritar.',
  },
  {
    id: 'p4', nombre: 'Jordan Court Low', marca: 'Jordan', precio: 150, stock: 7,
    imagen: '', color: '#4429F2', acento: '#FFFFFF', destacado: true, activo: true, tallas: TALLAS,
    descripcion: 'Versión baja en azul eléctrico, liviana y cómoda para caminar.',
  },
  {
    id: 'p5', nombre: 'Michael Kors Runner', marca: 'Michael Kors', precio: 130, stock: 9,
    imagen: '', color: '#F2A7C3', acento: '#17133A', destacado: false, activo: true, tallas: TALLAS,
    descripcion: 'Corte deportivo en rosa suave con franja lateral.',
  },
  {
    id: 'p6', nombre: 'Karl Lagerfeld Court', marca: 'Karl Lagerfeld', precio: 175, stock: 5,
    imagen: '', color: '#F1EFFB', acento: '#17133A', destacado: false, activo: true, tallas: TALLAS,
    descripcion: 'Blanca, minimalista y fácil de combinar con todo.',
  },
]
