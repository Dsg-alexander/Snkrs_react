import { useState } from 'react'
import {
  soloDigitos, validarTarjeta, validarNombre, validarExp, validarCvv, validarDireccion,
} from '../lib/validaciones'

function FormularioPago({ onComprar, cargando = false }) {
  const [numeroTarjeta, setNumeroTarjeta] = useState('')
  const [nombreTarjeta, setNombreTarjeta] = useState('')
  const [exp, setExp] = useState('')
  const [cvv, setCvv] = useState('')
  const [direccion, setDireccion] = useState('')
  const [errores, setErrores] = useState({})

  const cambiarNumero = (v) =>
    setNumeroTarjeta(soloDigitos(v).slice(0, 16).replace(/(.{4})/g, '$1 ').trim())

  const cambiarExp = (v) => {
    const d = soloDigitos(v).slice(0, 4)
    setExp(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d)
  }

  const validar = () => {
    const e = {}
    if (!validarTarjeta(numeroTarjeta)) e.numeroTarjeta = 'El número debe tener 16 dígitos.'
    if (!validarNombre(nombreTarjeta)) e.nombreTarjeta = 'Escribe el nombre que aparece en la tarjeta.'
    if (!validarExp(exp)) e.exp = 'Usa el formato MM/AA y una fecha vigente.'
    if (!validarCvv(cvv)) e.cvv = 'El CVV tiene 3 dígitos.'
    if (!validarDireccion(direccion)) e.direccion = 'Escribe una dirección de al menos 5 caracteres.'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const enviar = (ev) => {
    ev.preventDefault()
    if (validar()) onComprar({ direccion })
  }

  const campo = (id, etiqueta, valor, onChange, extra = {}) => (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      <input
        id={id} value={valor}
        onChange={(e) => {
          onChange(e.target.value)
          if (errores[id]) setErrores((er) => ({ ...er, [id]: undefined }))
        }}
        aria-invalid={!!errores[id]} aria-describedby={errores[id] ? `${id}-error` : undefined}
        {...extra}
      />
      {errores[id] && <small id={`${id}-error`} className="error-msj" role="alert">{errores[id]}</small>}
    </div>
  )

  return (
    <form id="formularioTarjeta" className="formulario-pago" onSubmit={enviar} noValidate>
      {campo('numeroTarjeta', 'Número de tarjeta', numeroTarjeta, cambiarNumero, {
        inputMode: 'numeric', autoComplete: 'cc-number', placeholder: '0000 0000 0000 0000', maxLength: 19,
      })}
      {campo('nombreTarjeta', 'Nombre del titular', nombreTarjeta, setNombreTarjeta, {
        autoComplete: 'cc-name', placeholder: 'Como aparece en la tarjeta', maxLength: 25,
      })}
      <div className="fila-2">
        {campo('exp', 'Vencimiento', exp, cambiarExp, {
          inputMode: 'numeric', autoComplete: 'cc-exp', placeholder: 'MM/AA', maxLength: 5,
        })}
        {campo('cvv', 'CVV', cvv, (v) => setCvv(soloDigitos(v).slice(0, 3)), {
          inputMode: 'numeric', autoComplete: 'cc-csc', placeholder: '123', maxLength: 3,
        })}
      </div>
      {campo('direccion', 'Dirección de envío (gratis)', direccion, setDireccion, {
        autoComplete: 'street-address', placeholder: 'Calle, número, comuna',
      })}
      <button type="submit" className="boton boton-primario boton-ancho" disabled={cargando}>
        {cargando ? 'Procesando…' : 'Pagar y comprar'}
      </button>
      <p className="nota">Es un pago de demostración: los datos de la tarjeta no se guardan ni se envían a ningún lado.</p>
    </form>
  )
}

export default FormularioPago
