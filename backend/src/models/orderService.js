/**
 * OrderService — Lógica de negocio para pedidos.
 */

const ESTADOS_VALIDOS = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'];

/**
 * Valida los datos de un nuevo pedido antes de guardarlo.
 * @param {{ userId, items, total, direccion, metodoPago }} datos
 * @returns {{ valido: boolean, errores: string[] }}
 */
function validarPedido(datos) {
  const errores = [];

  if (!datos.userId)
    errores.push('El ID de usuario es obligatorio');
  if (!Array.isArray(datos.items) || datos.items.length === 0)
    errores.push('El pedido debe contener al menos un producto');
  if (!datos.total || datos.total <= 0)
    errores.push('El total debe ser mayor a cero');
  if (!datos.direccion || datos.direccion.trim() === '')
    errores.push('La dirección de envío es obligatoria');
  if (!datos.metodoPago)
    errores.push('El método de pago es obligatorio');

  return { valido: errores.length === 0, errores };
}

/**
 * Calcula el total de un pedido a partir de sus items.
 * @param {{ precio: number, cantidad: number }[]} items
 * @returns {number}
 */
function calcularTotalPedido(items) {
  return parseFloat(
    items.reduce((sum, i) => sum + i.precio * i.cantidad, 0).toFixed(2)
  );
}

/**
 * Valida si una transición de estado es válida.
 * @param {string} estadoActual
 * @param {string} nuevoEstado
 * @returns {boolean}
 */
function puedeTransicionarEstado(estadoActual, nuevoEstado) {
  const transiciones = {
    pendiente:   ['confirmado', 'cancelado'],
    confirmado:  ['enviado',    'cancelado'],
    enviado:     ['entregado'],
    entregado:   [],
    cancelado:   [],
  };
  return (transiciones[estadoActual] || []).includes(nuevoEstado);
}

module.exports = { validarPedido, calcularTotalPedido, puedeTransicionarEstado, ESTADOS_VALIDOS };
