export const soloDigitos = (s = '') => s.replace(/\D/g, '')

export const validarTarjeta = (n) => soloDigitos(n).length === 16
export const validarNombre = (n) => !!n && n.trim().length >= 3
export const validarCvv = (c) => /^\d{3}$/.test(c || '')
export const validarDireccion = (d) => !!d && d.trim().length >= 5
export const validarEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || '')

export const validarExp = (exp) => {
  const m = /^(\d{2})\/(\d{2})$/.exec(exp || '')
  if (!m) return false
  const mes = Number(m[1])
  const anio = 2000 + Number(m[2])
  if (mes < 1 || mes > 12) return false
  const hoy = new Date()
  return anio > hoy.getFullYear() || (anio === hoy.getFullYear() && mes >= hoy.getMonth() + 1)
}
