// Persistencia simple en localStorage (el proyecto no tiene backend).
export const leer = (clave, defecto) => {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : defecto
  } catch {
    return defecto
  }
}

export const guardar = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora */
  }
}

export const nuevoId = (prefijo = 'id') =>
  `${prefijo}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
