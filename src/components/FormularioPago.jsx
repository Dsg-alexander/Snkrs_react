import React, { useState } from 'react'

function FormularioPago({ onComprar }) {
  const [numeroTarjeta, setNumeroTarjeta] = useState('')
  const [nombreTarjeta, setNombreTarjeta] = useState('')
  const [exp, setExp] = useState('')
  const [cvv, setCvv] = useState('')
  const [direccion, setDireccion] = useState('')
  const [errores, setErrores] = useState({})

  const validar = () => {
    const nuevosErrores = {}
    if (!numeroTarjeta || numeroTarjeta.length < 16) {
      nuevosErrores.numeroTarjeta = 'Numero de tarjeta invalido'
    }
    if (!nombreTarjeta || nombreTarjeta.length < 3) {
      nuevosErrores.nombreTarjeta = 'Nombre requerido'
    }
    if (!exp || !/^\d{2}\/\d{2}$/.test(exp)) {
      nuevosErrores.exp = 'Formato MM/AA'
    }
    if (!cvv || cvv.length < 3) {
      nuevosErrores.cvv = 'CVV invalido'
    }
    if (!direccion || direccion.length < 5) {
      nuevosErrores.direccion = 'Direccion requerida'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleComprar = (e) => {
    e.preventDefault()
    if (validar()) {
      onComprar()
    } else {
      alert('Por favor complete todos los campos correctamente')
    }
  }

  return (
    <form id="formularioTarjeta" className="formulario-pago" onSubmit={handleComprar}>
      <div>
        <label className="estilotarjeta">Número tarjeta</label>
        <input 
          id="numeroTarjeta" 
          className="form-control form-control-sm"
          maxLength="19" 
          placeholder="0000 0000 0000 0000"
          value={numeroTarjeta}
          onChange={(e) => setNumeroTarjeta(e.target.value)}
        />
        {errores.numeroTarjeta && <small className="text-danger">{errores.numeroTarjeta}</small>}
      </div>

      <br />

      <div>
        <label className="estilotarjeta">Nombre titular</label>
        <input 
          id="nombreTarjeta" 
          className="form-control form-control-sm"
          maxLength="25" 
          placeholder="Nombre en la tarjeta"
          value={nombreTarjeta}
          onChange={(e) => setNombreTarjeta(e.target.value)}
        />
        {errores.nombreTarjeta && <small className="text-danger">{errores.nombreTarjeta}</small>}
      </div>

      <br />

      <div>
        <label className="estilotarjeta">Fecha expiración</label>
        <input 
          id="exp" 
          className="form-control form-control-sm d-inline-block w-auto"
          placeholder="MM/AA" 
          maxLength="5"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
        />
        <label className="estilotarjeta">CVV</label>
        <input 
          id="cvv" 
          className="form-control form-control-sm d-inline-block w-auto"
          maxLength="3" 
          placeholder="123"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        {errores.exp && <small className="text-danger d-block">{errores.exp}</small>}
        {errores.cvv && <small className="text-danger d-block">{errores.cvv}</small>}
      </div>

      <br /><br />

      <div>
        <label className="estilotarjeta">Dirección de envio (Gratis)</label>
        <input 
          id="direccionEnvio" 
          className="form-control form-control-sm"
          placeholder="Dirección de envío"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        {errores.direccion && <small className="text-danger">{errores.direccion}</small>}
      </div>

      <br />

      <button type="submit" className="btn btn-primary btn-sm">
        Comprar
      </button>
    </form>
  )
}

export default FormularioPago
