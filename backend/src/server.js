const express = require('express');
const cors    = require('cors');

const productRoutes = require('./routes/productRoutes');
const cartRoutes    = require('./routes/cartRoutes');
const orderRoutes   = require('./routes/orderRoutes');
const userRoutes    = require('./routes/userRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Rutas ──────────────────────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/cart',     cartRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/auth',     userRoutes);

// ── Health check ───────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'OK', service: 'TechStore API' }));

// ── 404 ────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`TechStore API corriendo en puerto ${PORT}`));
}

module.exports = app;
