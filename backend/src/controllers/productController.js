const { crearProducto } = require('../models/productService');

// En producción estos métodos consultan la BD vía db.js
// Para el proyecto académico retornan datos de ejemplo

const productos = [
  { id: 1, nombre: 'Laptop Pro 14',           precio: 3499, stock: 15, categoria: 'Laptops' },
  { id: 2, nombre: 'Smartphone X5',            precio: 1599, stock: 25, categoria: 'Celulares' },
  { id: 3, nombre: 'Audífonos Bluetooth Pro',  precio:  249, stock: 40, categoria: 'Audio' },
  { id: 4, nombre: 'Mouse Gamer RGB',           precio:   89, stock: 60, categoria: 'Accesorios' },
  { id: 5, nombre: 'Teclado Mecánico RGB',      precio:  199, stock: 35, categoria: 'Accesorios' },
  { id: 6, nombre: 'Monitor 24" Full HD',       precio:  699, stock: 20, categoria: 'Monitores' },
];

exports.getAll = (req, res) => {
  const { categoria, search } = req.query;
  let resultado = [...productos];
  if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
  if (search)    resultado = resultado.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()));
  res.json(resultado);
};

exports.getById = (req, res) => {
  const p = productos.find(p => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(p);
};

exports.create = (req, res) => {
  try {
    const { nombre, precio, stock, categoria } = req.body;
    const nuevo = crearProducto(nombre, parseFloat(precio), parseInt(stock), categoria);
    const producto = { id: productos.length + 1, ...nuevo };
    productos.push(producto);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = (req, res) => {
  const idx = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  productos[idx] = { ...productos[idx], ...req.body };
  res.json(productos[idx]);
};

exports.remove = (req, res) => {
  const idx = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  productos.splice(idx, 1);
  res.json({ mensaje: 'Producto eliminado correctamente' });
};
