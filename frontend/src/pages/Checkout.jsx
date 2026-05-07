import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cart }) {
  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + i.precio * i.cantidad, 0);

  const [form, setForm] = useState({ nombre:'', direccion:'', ciudad:'', telefono:'', metodoPago:'tarjeta' });
  const [errores, setErrores] = useState({});

  const validar = () => {
    const e = {};
    if (!form.nombre.trim())    e.nombre    = 'El nombre es obligatorio';
    if (!form.direccion.trim()) e.direccion = 'La dirección es obligatoria';
    if (!form.ciudad.trim())    e.ciudad    = 'La ciudad es obligatoria';
    if (!form.telefono.trim())  e.telefono  = 'El teléfono es obligatorio';
    return e;
  };

  const handleSubmit = () => {
    const e = validar();
    if (Object.keys(e).length) { setErrores(e); return; }
    navigate('/confirmation');
  };

  const field = (key, label, type='text') => (
    <div style={s.field} key={key}>
      <label style={s.label}>{label}</label>
      <input
        style={{ ...s.input, ...(errores[key] ? s.inputError : {}) }}
        type={type}
        value={form[key]}
        onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrores({ ...errores, [key]: '' }); }}
        aria-label={label}
      />
      {errores[key] && <span style={s.err}>{errores[key]}</span>}
    </div>
  );

  return (
    <div style={s.wrap}>
      <h2 style={s.title}>Datos de envío y pago</h2>
      <div style={s.grid}>
        <div style={s.formSection}>
          <h3 style={s.sub}>Información de envío</h3>
          {field('nombre',    'Nombre completo')}
          {field('direccion', 'Dirección')}
          {field('ciudad',    'Ciudad')}
          {field('telefono',  'Teléfono', 'tel')}

          <h3 style={{ ...s.sub, marginTop:'20px' }}>Método de pago</h3>
          {['tarjeta','transferencia','efectivo'].map(m => (
            <label key={m} style={s.radio}>
              <input type="radio" name="pago" value={m} checked={form.metodoPago===m}
                onChange={() => setForm({ ...form, metodoPago: m })} />
              {' '}{m.charAt(0).toUpperCase()+m.slice(1)}
            </label>
          ))}
        </div>

        <div style={s.summary}>
          <h3 style={s.sub}>Resumen del pedido</h3>
          {cart.map(i => (
            <div key={i.id} style={s.sumRow}>
              <span>{i.nombre} × {i.cantidad}</span>
              <span>S/ {(i.precio*i.cantidad).toLocaleString('es-PE')}</span>
            </div>
          ))}
          <div style={s.totalRow}>
            <strong>Total</strong>
            <strong style={{ color:'#4A235A' }}>S/ {total.toLocaleString('es-PE')}</strong>
          </div>
          <button style={s.btn} onClick={handleSubmit}>Confirmar compra ✓</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrap:     { maxWidth:'900px' },
  title:    { fontSize:'1.4rem', fontWeight:'bold', color:'#4A235A', marginBottom:'20px' },
  sub:      { fontSize:'1.05rem', fontWeight:'bold', color:'#2E86C1', marginBottom:'12px' },
  grid:     { display:'grid', gridTemplateColumns:'1fr 340px', gap:'24px' },
  formSection:{ background:'#fff', border:'1px solid #E0E0E0', borderRadius:'10px', padding:'20px' },
  field:    { display:'flex', flexDirection:'column', marginBottom:'14px' },
  label:    { fontSize:'0.9rem', fontWeight:'bold', marginBottom:'4px', color:'#555' },
  input:    { padding:'10px 12px', border:'2px solid #D7BDE2', borderRadius:'6px', fontSize:'0.95rem' },
  inputError:{ borderColor:'#E74C3C' },
  err:      { color:'#E74C3C', fontSize:'0.8rem', marginTop:'3px' },
  radio:    { display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px', cursor:'pointer' },
  summary:  { background:'#fff', border:'1px solid #E0E0E0', borderRadius:'10px', padding:'20px', display:'flex', flexDirection:'column', gap:'8px', height:'fit-content' },
  sumRow:   { display:'flex', justifyContent:'space-between', fontSize:'0.9rem', color:'#555' },
  totalRow: { display:'flex', justifyContent:'space-between', padding:'10px 0', borderTop:'2px solid #D7BDE2', marginTop:'8px' },
  btn:      { background:'#4A235A', color:'#fff', fontWeight:'bold', fontSize:'1rem', marginTop:'8px' },
};
