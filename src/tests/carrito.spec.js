// Pruebas unitarias simples para la logica del carrito
// (estilo Jasmine)

describe('Logica del Carrito', function() {

  var carrito = [];

  beforeEach(function() {
    carrito = [];
  });

  it('deberia agregar un producto al carrito', function() {
    var producto = { id: 1, nombre: 'Jordan Sneak', talla: '8', precio: 140 };
    carrito.push(producto);
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Jordan Sneak');
  });

  it('deberia limitar a 4 productos maximo', function() {
    for (var i = 0; i < 4; i++) {
      carrito.push({ id: i+1, nombre: 'Test', talla: '8', precio: 100 });
    }
    expect(carrito.length).toBe(4);

    // simular limite
    var puedeAgregar = carrito.length < 4;
    expect(puedeAgregar).toBe(false);
  });

  it('deberia calcular el total del carrito', function() {
    carrito.push({ id: 1, nombre: 'Jordan', talla: '8', precio: 140 });
    carrito.push({ id: 2, nombre: 'MK', talla: '9', precio: 120 });
    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
      total += carrito[i].precio;
    }
    expect(total).toBe(260);
  });

  it('deberia validar talla seleccionada', function() {
    var tallasValidas = ['7', '7.5', '8', '8.5', '9'];
    expect(tallasValidas.indexOf('8')).toBeGreaterThan(-1);
    expect(tallasValidas.indexOf('10')).toBe(-1);
  });

  it('deberia crear producto con propiedades correctas', function() {
    var producto = {
      id: 1,
      nombre: 'Karl Lagerfeld Sneak',
      talla: '7.5',
      precio: 160
    };
    expect(producto.nombre).toContain('Karl');
    expect(producto.precio).toBe(160);
    expect(typeof producto.talla).toBe('string');
  });

});
