/**
 * Pruebas unitarias: ProductService
 * Ciclo TDD — Red → Green → Refactor
 * Evaluación Final — Construcción de Software (ASUC00947)
 */
const { crearProducto, tieneStock, aplicarDescuento } = require('../models/productService');

describe('ProductService — crearProducto()', () => {

  // ── RED → GREEN ────────────────────────────────────────────────────

  test('debe crear producto con todos los campos válidos', () => {
    const p = crearProducto('Laptop Pro 14', 3499.00, 15, 'Laptops');
    expect(p.nombre).toBe('Laptop Pro 14');
    expect(p.precio).toBe(3499.00);
    expect(p.stock).toBe(15);
    expect(p.categoria).toBe('Laptops');
  });

  test('debe recortar espacios del nombre y categoría', () => {
    const p = crearProducto('  Mouse Gamer  ', 89.00, 60, '  Accesorios  ');
    expect(p.nombre).toBe('Mouse Gamer');
    expect(p.categoria).toBe('Accesorios');
  });

  // ── REFACTOR — Validaciones de negocio ────────────────────────────

  test('debe lanzar error si el nombre está vacío', () => {
    expect(() => crearProducto('', 89.00, 10, 'Audio'))
      .toThrow('El nombre no puede estar vacío');
  });

  test('debe lanzar error si el nombre es solo espacios', () => {
    expect(() => crearProducto('   ', 89.00, 10, 'Audio'))
      .toThrow('El nombre no puede estar vacío');
  });

  test('debe lanzar error si el precio es negativo', () => {
    expect(() => crearProducto('Teclado', -50, 10, 'Accesorios'))
      .toThrow('El precio no puede ser negativo');
  });

  test('precio cero es válido (producto gratuito/muestra)', () => {
    const p = crearProducto('Muestra gratis', 0, 5, 'Accesorios');
    expect(p.precio).toBe(0);
  });

  test('debe lanzar error si el stock es negativo', () => {
    expect(() => crearProducto('Monitor 24"', 699, -1, 'Monitores'))
      .toThrow('El stock no puede ser negativo');
  });

  test('debe lanzar error si la categoría está vacía', () => {
    expect(() => crearProducto('Laptop', 1500, 5, ''))
      .toThrow('La categoría no puede estar vacía');
  });
});

describe('ProductService — tieneStock()', () => {

  test('debe retornar true si el producto tiene stock suficiente', () => {
    expect(tieneStock({ stock: 10 }, 5)).toBe(true);
  });

  test('debe retornar false si el stock es insuficiente', () => {
    expect(tieneStock({ stock: 2 }, 5)).toBe(false);
  });

  test('debe retornar true si se pide exactamente el stock disponible', () => {
    expect(tieneStock({ stock: 3 }, 3)).toBe(true);
  });

  test('debe lanzar error si la cantidad es cero o negativa', () => {
    expect(() => tieneStock({ stock: 5 }, 0))
      .toThrow('La cantidad debe ser mayor a cero');
  });
});

describe('ProductService — aplicarDescuento()', () => {

  test('debe aplicar descuento del 10% correctamente', () => {
    expect(aplicarDescuento(100, 10)).toBe(90.00);
  });

  test('descuento 0% retorna el precio original', () => {
    expect(aplicarDescuento(500, 0)).toBe(500.00);
  });

  test('descuento 100% retorna precio cero', () => {
    expect(aplicarDescuento(200, 100)).toBe(0.00);
  });

  test('debe lanzar error si el porcentaje supera 100', () => {
    expect(() => aplicarDescuento(100, 110))
      .toThrow('El porcentaje debe estar entre 0 y 100');
  });
});
