import React from 'react';

export default function ProductCard({ product, onAdd }) {
  const { nombre, precio, stock, categoria, descripcion } = product;
  return (
    <div style={s.card}>
      <div style={s.img}>🖥️</div>
      <div style={s.badge}>{categoria}</div>
      <h3 style={s.name}>{nombre}</h3>
      <p style={s.desc}>{descripcion}</p>
      <p style={s.price}>S/ {precio.toLocaleString('es-PE')}</p>
      <p style={stock > 0 ? s.inStock : s.noStock}>
        {stock > 0 ? `✅ En stock (${stock})` : '❌ Sin stock'}
      </p>
      <button
        style={stock > 0 ? s.btn : s.btnDisabled}
        onClick={onAdd}
        disabled={stock === 0}
        aria-label={`Agregar ${nombre} al carrito`}
      >
        🛒 Agregar al carrito
      </button>
    </div>
  );
}

const s = {
  card:       { background:'#fff', border:'1px solid #E0E0E0', borderRadius:'10px', padding:'16px', display:'flex', flexDirection:'column', gap:'8px', boxShadow:'0 2px 6px rgba(0,0,0,.06)' },
  img:        { fontSize:'3rem', textAlign:'center', padding:'12px', background:'#F2F3F4', borderRadius:'8px' },
  badge:      { background:'#EBF5FB', color:'#2E86C1', fontSize:'0.78rem', fontWeight:'bold', padding:'2px 10px', borderRadius:'20px', alignSelf:'flex-start' },
  name:       { fontWeight:'bold', fontSize:'1rem', color:'#2C2C2C' },
  desc:       { fontSize:'0.85rem', color:'#777', flexGrow:1 },
  price:      { fontSize:'1.2rem', fontWeight:'bold', color:'#4A235A' },
  inStock:    { fontSize:'0.82rem', color:'#27AE60' },
  noStock:    { fontSize:'0.82rem', color:'#E74C3C' },
  btn:        { background:'#4A235A', color:'#fff', fontWeight:'bold', marginTop:'4px' },
  btnDisabled:{ background:'#BDC3C7', color:'#fff', fontWeight:'bold', marginTop:'4px', cursor:'not-allowed' },
};
