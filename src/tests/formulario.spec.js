// Pruebas unitarias para validacion del formulario de pago

describe('Validacion Formulario Pago', function() {

  function validarTarjeta(numero) {
    return !!numero && numero.length >= 16;
  }

  function validarNombre(nombre) {
    return !!nombre && nombre.length >= 3;
  }

  function validarExp(exp) {
    return !!exp && /^\d{2}\/\d{2}$/.test(exp);
  }

  function validarCvv(cvv) {
    return !!cvv && cvv.length >= 3;
  }

  function validarDireccion(dir) {
    return !!dir && dir.length >= 5;
  }

  it('deberia validar numero de tarjeta correcto', function() {
    expect(validarTarjeta('1234567812345678')).toBe(true);
    expect(validarTarjeta('1234')).toBe(false);
    expect(validarTarjeta('')).toBe(false);
  });

  it('deberia validar nombre del titular', function() {
    expect(validarNombre('Juan Perez')).toBe(true);
    expect(validarNombre('Jo')).toBe(false);
    expect(validarNombre('')).toBe(false);
  });

  it('deberia validar formato de fecha expiracion', function() {
    expect(validarExp('12/25')).toBe(true);
    expect(validarExp('1225')).toBe(false);
    expect(validarExp('12-25')).toBe(false);
  });

  it('deberia validar CVV', function() {
    expect(validarCvv('123')).toBe(true);
    expect(validarCvv('12')).toBe(false);
  });

  it('deberia validar direccion de envio', function() {
    expect(validarDireccion('Calle 123')).toBe(true);
    expect(validarDireccion('abc')).toBe(false);
  });

});
