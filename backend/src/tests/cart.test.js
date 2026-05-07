/**
 * Pruebas unitarias: CartService — Kata TDD Carrito de Compras
 * Evaluación Final — Construcción de Software (ASUC00947)
 */
const { calcularTotal, agregarProducto, eliminarProducto, actualizarCantidad } =
  require('../models/cartService');

describe('CartService — calcularTotal()', () => {

  test('total de carrito vacío debe ser 0', () => {
    expect(calcularTotal([])).toBe(0);
  });

  test('debe calcular total con un solo producto', () => {
    expect(calcularTotal([{ precio: 89, cantidad: 1 }])).toBe(89);
  });

  test('debe calcular total con múltiples productos', () => {
    const items = [
      { precio: 3499, cantidad: 1 },
      { precio:   89, cantidad: 2 },
    ];
    expect(calcularTotal(items)).toBe(3677);
  });

  test('debe considerar la cantidad en el cálculo', () => {
    expect(calcularTotal([{ precio: 100, cantidad: 3 }])).toBe(300);
  });

  test('debe lanzar error si items no es un arreglo', () => {
    expect(() => calcularTotal(null)).toThrow('Items debe ser un arreglo');
  });
});

describe('CartService — agregarProducto()', () => {

  test('debe agregar un producto a un carrito vacío', () => {
    const resultado = agregarProducto([], { id: 1, precio: 100 }, 1);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe(1);
    expect(resultado[0].cantidad).toBe(1);
  });

  test('debe incrementar la cantidad si el producto ya existe', () => {
    const carrito = [{ id: 1, precio: 100, cantidad: 2 }];
    const resultado = agregarProducto(carrito, { id: 1, precio: 100 }, 3);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(5);
  });

  test('debe agregar como nuevo ítem si es un producto diferente', () => {
    const carrito = [{ id: 1, precio: 100, cantidad: 1 }];
    const resultado = agregarProducto(carrito, { id: 2, precio: 200 }, 1);
    expect(resultado).toHaveLength(2);
  });

  test('debe lanzar error si la cantidad es cero', () => {
    expect(() => agregarProducto([], { id: 1, precio: 100 }, 0))
      .toThrow('La cantidad debe ser mayor a cero');
  });
});

describe('CartService — eliminarProducto()', () => {

  test('debe eliminar el producto del carrito', () => {
    const carrito = [
      { id: 1, precio: 100, cantidad: 1 },
      { id: 2, precio: 200, cantidad: 2 },
    ];
    const resultado = eliminarProducto(carrito, 1);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe(2);
  });

  test('no hace nada si el producto no existe en el carrito', () => {
    const carrito = [{ id: 1, precio: 100, cantidad: 1 }];
    const resultado = eliminarProducto(carrito, 99);
    expect(resultado).toHaveLength(1);
  });

  test('carrito queda vacío al eliminar el único producto', () => {
    const carrito = [{ id: 1, precio: 100, cantidad: 1 }];
    expect(eliminarProducto(carrito, 1)).toHaveLength(0);
  });
});

describe('CartService — actualizarCantidad()', () => {

  test('debe actualizar la cantidad del producto indicado', () => {
    const carrito = [{ id: 1, precio: 100, cantidad: 1 }];
    const resultado = actualizarCantidad(carrito, 1, 5);
    expect(resultado[0].cantidad).toBe(5);
  });

  test('no debe modificar otros productos del carrito', () => {
    const carrito = [
      { id: 1, precio: 100, cantidad: 1 },
      { id: 2, precio: 200, cantidad: 3 },
    ];
    const resultado = actualizarCantidad(carrito, 1, 10);
    expect(resultado[1].cantidad).toBe(3);
  });

  test('debe lanzar error si la nueva cantidad es cero o negativa', () => {
    expect(() => actualizarCantidad([{ id: 1, cantidad: 1 }], 1, 0))
      .toThrow('La cantidad debe ser mayor a cero');
  });
});
