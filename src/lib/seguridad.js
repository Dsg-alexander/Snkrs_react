// Hash SHA-256 de la clave. Es solo para la demo: con un backend real
// la autenticación se hace en el servidor, nunca en el navegador.
export async function hashClave(email, clave) {
  const texto = `${email.trim().toLowerCase()}::${clave}`
  if (!globalThis.crypto?.subtle) {
    return 'b64:' + btoa(unescape(encodeURIComponent(texto)))
  }
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto))
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
