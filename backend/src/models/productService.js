/**
 * ProductService — Lógica de negocio para productos.
 * Desarrollado con TDD: cada función fue precedida por su prueba unitaria.
 */

/**
 * Crea un objeto producto con validaciones de negocio.
 * @param {string} nombre
 * @param {number} precio
 * @param {number} stock
 * @param {string} categoria
 * @returns {{ nombre, precio, stock, categoria }}
 */
function crearProducto(nombre, precio, stock, categoria) {
  if (!nombre || nombre.trim() === '')
    throw new Error('El nombre no puede estar vacío');
  if (typeof precio !== 'number' || precio < 0)
    throw new Error('El precio no puede ser negativo');
  if (typeof stock !== 'number' || stock < 0)
    throw new Error('El stock no puede ser negativo');
  if (!categoria || categoria.trim() === '')
    throw new Error('La categoría no puede estar vacía');

  return {
    nombre:    nombre.trim(),
    precio,
    stock,
    categoria: categoria.trim(),
  };
}

/**
 * Verifica si un producto tiene stock disponible.
 * @param {{ stock: number }} producto
 * @param {number} cantidad
 * @returns {boolean}
 */
function tieneStock(producto, cantidad = 1) {
  if (!producto) throw new Error('Producto no puede ser nulo');
  if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a cero');
  return producto.stock >= cantidad;
}

/**
 * Aplica descuento porcentual al precio de un producto.
 * @param {number} precio
 * @param {number} porcentaje  (0-100)
 * @returns {number}
 */
function aplicarDescuento(precio, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100)
    throw new Error('El porcentaje debe estar entre 0 y 100');
  return parseFloat((precio * (1 - porcentaje / 100)).toFixed(2));
}

module.exports = { crearProducto, tieneStock, aplicarDescuento };
