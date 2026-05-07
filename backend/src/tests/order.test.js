/**
 * Pruebas unitarias: OrderService
 * Evaluación Final — Construcción de Software (ASUC00947)
 */
const { validarPedido, calcularTotalPedido, puedeTransicionarEstado } =
  require('../models/orderService');

describe('OrderService — validarPedido()', () => {

  const pedidoValido = {
    userId:     1,
    items:      [{ productoId: 1, cantidad: 1, precio: 3499 }],
    total:      3499,
    direccion:  'Av. Universitaria 123, Lima',
    metodoPago: 'tarjeta',
  };

  test('debe validar un pedido con todos los datos correctos', () => {
    const { valido, errores } = validarPedido(pedidoValido);
    expect(valido).toBe(true);
    expect(errores).toHaveLength(0);
  });

  test('debe fallar si no se envían items', () => {
    const { valido, errores } = validarPedido({ ...pedidoValido, items: [] });
    expect(valido).toBe(false);
    expect(errores).toContain('El pedido debe contener al menos un producto');
  });

  test('debe fallar si el userId está ausente', () => {
    const { valido } = validarPedido({ ...pedidoValido, userId: null });
    expect(valido).toBe(false);
  });

  test('debe fallar si la dirección está vacía', () => {
    const { valido, errores } = validarPedido({ ...pedidoValido, direccion: '' });
    expect(valido).toBe(false);
    expect(errores).toContain('La dirección de envío es obligatoria');
  });

  test('debe fallar si el total es cero', () => {
    const { valido } = validarPedido({ ...pedidoValido, total: 0 });
    expect(valido).toBe(false);
  });

  test('debe acumular múltiples errores a la vez', () => {
    const { errores } = validarPedido({ items: [], total: 0 });
    expect(errores.length).toBeGreaterThan(1);
  });
});

describe('OrderService — calcularTotalPedido()', () => {

  test('debe calcular correctamente con un item', () => {
    expect(calcularTotalPedido([{ precio: 3499, cantidad: 1 }])).toBe(3499);
  });

  test('debe calcular correctamente con múltiples items', () => {
    const items = [
      { precio: 3499, cantidad: 1 },
      { precio:   89, cantidad: 2 },
    ];
    expect(calcularTotalPedido(items)).toBe(3677);
  });

  test('total con lista vacía debe ser 0', () => {
    expect(calcularTotalPedido([])).toBe(0);
  });
});

describe('OrderService — puedeTransicionarEstado()', () => {

  test('pendiente puede pasar a confirmado', () => {
    expect(puedeTransicionarEstado('pendiente', 'confirmado')).toBe(true);
  });

  test('pendiente puede ser cancelado', () => {
    expect(puedeTransicionarEstado('pendiente', 'cancelado')).toBe(true);
  });

  test('confirmado puede pasar a enviado', () => {
    expect(puedeTransicionarEstado('confirmado', 'enviado')).toBe(true);
  });

  test('entregado NO puede transicionar a ningún estado', () => {
    expect(puedeTransicionarEstado('entregado', 'cancelado')).toBe(false);
  });

  test('cancelado NO puede reactivarse', () => {
    expect(puedeTransicionarEstado('cancelado', 'pendiente')).toBe(false);
  });

  test('no permite saltar estados (pendiente → entregado)', () => {
    expect(puedeTransicionarEstado('pendiente', 'entregado')).toBe(false);
  });
});
