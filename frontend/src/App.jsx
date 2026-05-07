import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing)
        return prev.map(i => i.id === product.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const totalItems = cart.reduce((s, i) => s + i.cantidad, 0);

  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <Link to="/" style={styles.brand}>🛒 TechStore</Link>
        <div style={styles.navLinks}>
          <Link to="/"        style={styles.link}>Inicio</Link>
          <Link to="/catalog" style={styles.link}>Catálogo</Link>
          <Link to="/cart"    style={styles.link}>
            Carrito {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
          </Link>
        </div>
      </nav>

      <main style={styles.main}>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/catalog"      element={<Catalog addToCart={addToCart} />} />
          <Route path="/cart"         element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout"     element={<Checkout cart={cart} />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const styles = {
  nav:      { background: '#4A235A', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand:    { color: '#fff', fontWeight: 'bold', fontSize: '1.3rem', textDecoration: 'none' },
  navLinks: { display: 'flex', gap: '20px' },
  link:     { color: '#D7BDE2', textDecoration: 'none', fontSize: '1rem' },
  badge:    { background: '#E74C3C', color: '#fff', borderRadius: '50%', padding: '2px 7px', fontSize: '0.75rem', marginLeft: '4px' },
  main:     { maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' },
};
