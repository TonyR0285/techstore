import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const MOCK = [
  { id:1, nombre:'Laptop Pro 14',          precio:3499, stock:15, categoria:'Laptops',    descripcion:'Laptop para trabajo profesional.' },
  { id:2, nombre:'Smartphone X5',           precio:1599, stock:25, categoria:'Celulares',  descripcion:'Cámara 108MP y 5G.' },
  { id:3, nombre:'Audífonos Bluetooth Pro', precio: 249, stock:40, categoria:'Audio',      descripcion:'Cancelación de ruido activa.' },
  { id:4, nombre:'Mouse Gamer RGB',          precio:  89, stock:60, categoria:'Accesorios', descripcion:'16000 DPI, ergonómico.' },
  { id:5, nombre:'Teclado Mecánico RGB',     precio: 199, stock:35, categoria:'Accesorios', descripcion:'Switches Blue retroiluminados.' },
  { id:6, nombre:'Monitor 24" Full HD',      precio: 699, stock:20, categoria:'Monitores',  descripcion:'IPS 144Hz para gaming.' },
];

export default function Catalog({ addToCart }) {
  const [productos, setProductos] = useState(MOCK);
  const [search, setSearch]       = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [toast, setToast]         = useState('');

  const categorias = ['Todas', ...new Set(MOCK.map(p => p.categoria))];

  const filtrados = productos.filter(p => {
    const matchCat  = categoria === 'Todas' || p.categoria === categoria;
    const matchText = p.nombre.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  const handleAdd = (product) => {
    addToCart(product);
    setToast(`✅ "${product.nombre}" agregado al carrito`);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div>
      {toast && <div style={s.toast}>{toast}</div>}
      <h2 style={s.title}>Catálogo de productos</h2>

      {/* Filtros — UCD: visibles y accesibles */}
      <div style={s.filters}>
        <input
          style={s.input}
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Buscar producto"
        />
        <select style={s.select} value={categoria} onChange={e => setCategoria(e.target.value)} aria-label="Filtrar por categoría">
          {categorias.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {filtrados.length === 0
        ? <p style={s.empty}>No encontramos productos. Prueba con otro filtro.</p>
        : <div style={s.grid}>
            {filtrados.map(p => <ProductCard key={p.id} product={p} onAdd={() => handleAdd(p)} />)}
          </div>
      }
    </div>
  );
}

const s = {
  title:    { fontSize:'1.4rem', fontWeight:'bold', color:'#4A235A', marginBottom:'16px' },
  filters:  { display:'flex', gap:'12px', marginBottom:'20px', flexWrap:'wrap' },
  input:    { flex:1, padding:'10px 14px', border:'2px solid #D7BDE2', borderRadius:'6px', fontSize:'0.95rem', minWidth:'200px' },
  select:   { padding:'10px 14px', border:'2px solid #D7BDE2', borderRadius:'6px', fontSize:'0.95rem' },
  grid:     { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'20px' },
  empty:    { color:'#777', padding:'32px', textAlign:'center' },
  toast:    { position:'fixed', top:'20px', right:'20px', background:'#27AE60', color:'#fff', padding:'12px 20px', borderRadius:'8px', zIndex:999, fontSize:'0.95rem' },
};
