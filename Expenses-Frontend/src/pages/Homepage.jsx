import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
    <PublicHeader />
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4491b3 0%, #2c5f7a 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      textAlign: 'center'
    }}>
      {/* Hero Section */}
      <div style={{
        maxWidth: '900px',
        animation: 'fadeIn 1.2s ease-out'
      }}>
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 5.5rem)',
          fontWeight: '800',
          marginBottom: '1rem',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          Expenses Tracker
        </h1>

        <p style={{
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          fontWeight: '400',
          opacity: 0.92,
          marginBottom: '3.5rem',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Take control of your money with elegance and clarity.  
          Private, beautiful, and built just for you.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem'
        }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              backgroundColor: 'white',
              color: '#2c5f7a',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Register
          </button>
        </div>
      </div>
      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    </>
  );
}