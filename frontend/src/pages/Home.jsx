import React from 'react';
import { Link } from 'react-router-dom';

const categorias = ['Laptops', 'Celulares', 'Audio', 'Gaming', 'Accesorios', 'Monitores'];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Tecnología que mejora tu día a día</h1>
        <p style={s.heroSub}>Laptops, celulares, accesorios gamer y más</p>
        <Link to="/catalog"><button style={s.heroBtn}>Ver catálogo</button></Link>
      </div>

      {/* Categorías */}
      <h2 style={s.sectionTitle}>Categorías</h2>
      <div style={s.catGrid}>
        {categorias.map(cat => (
          <Link to={`/catalog?categoria=${cat}`} key={cat} style={{ textDecoration: 'none' }}>
            <div style={s.catCard}>{cat}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const s = {
  hero:       { background: 'linear-gradient(135deg,#4A235A,#2E86C1)', borderRadius: '12px', padding: '48px 32px', textAlign: 'center', marginBottom: '32px' },
  heroTitle:  { color: '#fff', fontSize: '2rem', fontWeight: 'bold', marginBottom: '12px' },
  heroSub:    { color: '#D7BDE2', fontSize: '1.1rem', marginBottom: '20px' },
  heroBtn:    { background: '#fff', color: '#4A235A', fontWeight: 'bold', fontSize: '1rem', padding: '12px 28px' },
  sectionTitle:{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '16px', color: '#4A235A' },
  catGrid:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '12px', marginBottom: '32px' },
  catCard:    { background: '#fff', border: '2px solid #D7BDE2', borderRadius: '8px', padding: '20px', textAlign: 'center', fontWeight: 'bold', color: '#4A235A', transition: 'border-color .2s' },
};
