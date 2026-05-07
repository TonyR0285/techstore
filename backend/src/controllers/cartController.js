const { calcularTotal, agregarProducto, eliminarProducto, actualizarCantidad } =
  require('../models/cartService');

// Carritos en memoria por userId (en producción: BD)
const carritos = {};

exports.getCart = (req, res) => {
  const { userId } = req.params;
  const items = carritos[userId] || [];
  res.json({ userId, items, total: calcularTotal(items) });
};

exports.addItem = (req, res) => {
  const { userId, producto, cantidad } = req.body;
  try {
    carritos[userId] = agregarProducto(carritos[userId] || [], producto, cantidad || 1);
    res.json({ items: carritos[userId], total: calcularTotal(carritos[userId]) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateItem = (req, res) => {
  const { userId, productoId, cantidad } = req.body;
  try {
    carritos[userId] = actualizarCantidad(carritos[userId] || [], productoId, cantidad);
    res.json({ items: carritos[userId], total: calcularTotal(carritos[userId]) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeItem = (req, res) => {
  const { userId } = req.body;
  const id = parseInt(req.params.id);
  carritos[userId] = eliminarProducto(carritos[userId] || [], id);
  res.json({ items: carritos[userId], total: calcularTotal(carritos[userId]) });
};
