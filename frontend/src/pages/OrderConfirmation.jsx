import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const numero = 'TS-' + Date.now().toString().slice(-6);
  return (
    <div style={s.wrap}>
      <div style={s.icon}>✅</div>
      <h2 style={s.title}>¡Pedido confirmado!</h2>
      <p style={s.sub}>Tu pedido <strong>{numero}</strong> ha sido generado con éxito.</p>
      <p style={s.msg}>Recibirás un correo con el seguimiento de tu compra.</p>
      <div style={s.actions}>
        <Link to="/catalog"><button style={s.btnPrimary}>Seguir comprando</button></Link>
        <Link to="/"><button style={s.btnSecondary}>Ir al inicio</button></Link>
      </div>
    </div>
  );
}

const s = {
  wrap:        { textAlign:'center', padding:'64px 24px', maxWidth:'500px', margin:'0 auto' },
  icon:        { fontSize:'4rem', marginBottom:'16px' },
  title:       { fontSize:'1.8rem', fontWeight:'bold', color:'#27AE60', marginBottom:'12px' },
  sub:         { fontSize:'1rem', color:'#555', marginBottom:'8px' },
  msg:         { fontSize:'0.9rem', color:'#777', marginBottom:'32px' },
  actions:     { display:'flex', gap:'12px', justifyContent:'center' },
  btnPrimary:  { background:'#4A235A', color:'#fff', fontWeight:'bold' },
  btnSecondary:{ background:'#F2F3F4', color:'#4A235A', fontWeight:'bold' },
};
