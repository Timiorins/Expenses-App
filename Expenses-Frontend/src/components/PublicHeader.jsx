// src/components/PublicHeader.jsx
import { NavLink } from 'react-router-dom';

export default function PublicHeader() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '1.5rem 2rem',
      zIndex: 1000,
      background: 'transparent', // no background/box
      pointerEvents: 'none' // so it doesn't block clicks underneath (optional)
    }}>
      <NavLink
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 6px rgba(0,0,0,0.4)',
          pointerEvents: 'auto', // only this part is clickable
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        Expenses Tracker
      </NavLink>
    </header>
  );
}