export const claseEstado = (estado) =>
  ({ Pagado: 'p-info', Enviado: 'p-aviso', Entregado: 'p-ok', Cancelado: 'p-error' }[estado] || 'p-neutra')
