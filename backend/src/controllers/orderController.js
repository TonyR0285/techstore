const { validarPedido, calcularTotalPedido, puedeTransicionarEstado } =
  require('../models/orderService');

const pedidos = [];
let nextId = 1;

exports.create = (req, res) => {
  const datos = req.body;
  const { valido, errores } = validarPedido(datos);
  if (!valido) return res.status(400).json({ errores });

  const pedido = {
    id:         nextId++,
    userId:     datos.userId,
    items:      datos.items,
    total:      calcularTotalPedido(datos.items),
    direccion:  datos.direccion,
    metodoPago: datos.metodoPago,
    estado:     'pendiente',
    fecha:      new Date().toISOString(),
  };
  pedidos.push(pedido);
  res.status(201).json(pedido);
};

exports.getByUser = (req, res) => {
  const userId = parseInt(req.params.userId);
  res.json(pedidos.filter(p => p.userId === userId));
};

exports.getAll = (_req, res) => res.json(pedidos);

exports.updateStatus = (req, res) => {
  const id = parseInt(req.params.id);
  const { nuevoEstado } = req.body;
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

  if (!puedeTransicionarEstado(pedido.estado, nuevoEstado))
    return res.status(400).json({ error: `No se puede cambiar de '${pedido.estado}' a '${nuevoEstado}'` });

  pedido.estado = nuevoEstado;
  res.json(pedido);
};
