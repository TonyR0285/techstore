import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((s, i) => s + i.precio * i.cantidad, 0);

  if (cart.length === 0)
    return (
      <div style={s.empty}>
        <p>🛒 Tu carrito está vacío.</p>
        <Link to="/catalog"><button style={s.btn}>Ver catálogo</button></Link>
      </div>
    );

  return (
    <div>
      <h2 style={s.title}>Tu carrito ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</h2>
      <div style={s.list}>
        {cart.map(item => (
          <div key={item.id} style={s.row}>
            <div style={s.info}>
              <strong>{item.nombre}</strong>
              <span style={s.qty}>Cantidad: {item.cantidad}</span>
            </div>
            <div style={s.right}>
              <span style={s.subtotal}>S/ {(item.precio * item.cantidad).toLocaleString('es-PE')}</span>
              <button
                style={s.del}
                onClick={() => {
                  if (window.confirm(`¿Eliminar "${item.nombre}" del carrito?`)) removeFromCart(item.id);
                }}
                aria-label={`Eliminar ${item.nombre}`}
              >✕</button>
            </div>
          </div>
        ))}
      </div>

      <div style={s.summary}>
        <span style={s.totalLabel}>Total:</span>
        <span style={s.totalAmt}>S/ {total.toLocaleString('es-PE')}</span>
      </div>
      <Link to="/checkout">
        <button style={s.checkout}>Proceder al pago →</button>
      </Link>
    </div>
  );
}

const s = {
  title:      { fontSize:'1.4rem', fontWeight:'bold', color:'#4A235A', marginBottom:'20px' },
  list:       { display:'flex', flexDirection:'column', gap:'12px', marginBottom:'20px' },
  row:        { background:'#fff', border:'1px solid #E0E0E0', borderRadius:'8px', padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  info:       { display:'flex', flexDirection:'column', gap:'4px' },
  qty:        { fontSize:'0.85rem', color:'#777' },
  right:      { display:'flex', alignItems:'center', gap:'16px' },
  subtotal:   { fontWeight:'bold', color:'#4A235A', fontSize:'1.05rem' },
  del:        { background:'#E74C3C', color:'#fff', borderRadius:'50%', width:'28px', height:'28px', display:'flex', alignItems:'center', justifyContent:'center', padding:0 },
  summary:    { display:'flex', justifyContent:'flex-end', gap:'12px', alignItems:'center', marginBottom:'16px', padding:'12px 0', borderTop:'2px solid #D7BDE2' },
  totalLabel: { fontSize:'1.1rem', fontWeight:'bold' },
  totalAmt:   { fontSize:'1.4rem', fontWeight:'bold', color:'#4A235A' },
  checkout:   { background:'#4A235A', color:'#fff', fontWeight:'bold', fontSize:'1rem', padding:'13px 28px', width:'100%' },
  empty:      { textAlign:'center', padding:'48px', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', color:'#777', fontSize:'1.1rem' },
  btn:        { background:'#4A235A', color:'#fff', fontWeight:'bold' },
};
