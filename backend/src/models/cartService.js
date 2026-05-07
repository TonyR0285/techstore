/**
 * CartService — Lógica de negocio del carrito de compras.
 * Desarrollado con TDD: Kata Carrito de Compras.
 */

/**
 * Calcula el total del carrito sumando precio × cantidad de cada item.
 * @param {{ precio: number, cantidad: number }[]} items
 * @returns {number}
 */
function calcularTotal(items) {
  if (!Array.isArray(items)) throw new Error('Items debe ser un arreglo');
  return parseFloat(
    items.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2)
  );
}

/**
 * Agrega un producto al carrito o incrementa su cantidad.
 * @param {{ id, precio, cantidad }[]} carrito
 * @param {{ id, precio }} producto
 * @param {number} cantidad
 * @returns {object[]} nuevo carrito
 */
function agregarProducto(carrito, producto, cantidad = 1) {
  if (!producto) throw new Error('Producto no puede ser nulo');
  if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a cero');

  const existente = carrito.find(i => i.id === producto.id);
  if (existente) {
    return carrito.map(i =>
      i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
    );
  }
  return [...carrito, { ...producto, cantidad }];
}

/**
 * Elimina un producto del carrito por su ID.
 * @param {{ id }[]} carrito
 * @param {number|string} id
 * @returns {object[]} nuevo carrito sin el producto
 */
function eliminarProducto(carrito, id) {
  return carrito.filter(item => item.id !== id);
}

/**
 * Actualiza la cantidad de un producto en el carrito.
 * @param {{ id, cantidad }[]} carrito
 * @param {number|string} id
 * @param {number} nuevaCantidad
 * @returns {object[]}
 */
function actualizarCantidad(carrito, id, nuevaCantidad) {
  if (nuevaCantidad <= 0) throw new Error('La cantidad debe ser mayor a cero');
  return carrito.map(item =>
    item.id === id ? { ...item, cantidad: nuevaCantidad } : item
  );
}

module.exports = { calcularTotal, agregarProducto, eliminarProducto, actualizarCantidad };
