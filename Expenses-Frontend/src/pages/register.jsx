import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';

function Register() {
  const [register, setRegister] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const [isMouseover, setIsMouseOver] = useState(false);

  function mouseOver() {
    setIsMouseOver(true);
  }

  function mouseOut() {
    setIsMouseOver(false);
  }

  function registerInput(event) {
    const { name, value } = event.target;
    setRegister((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submitRegister(event) {
    setRegister({
      fName: "",
      lName: "",
      email: "",
      password: "",
    });
    event.preventDefault();
    // → Add your real registration logic here later (axios to backend)
  }

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
      textAlign: 'center',
      animation: 'fadeIn 1s ease-out'
    }}>
      {/* Form container – glass-like, centered */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '520px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.18)'
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          marginBottom: '2.5rem',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>
          Register
        </h1>

        <form onSubmit={submitRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {/* Name row */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              onChange={registerInput}
              name="fName"
              value={register.fName}
              placeholder="First name"
              required
              style={{
                flex: 1,
                minWidth: '160px',
                padding: '1rem 1.2rem',
                fontSize: '1.1rem',
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: '10px',
                color: 'white',
                outline: 'none',
                transition: 'all 0.25s ease',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)'
              }}
              onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.28)'}
              onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.18)'}
            />

            <input
              onChange={registerInput}
              name="lName"
              value={register.lName}
              placeholder="Last name"
              required
              style={{
                flex: 1,
                minWidth: '160px',
                padding: '1rem 1.2rem',
                fontSize: '1.1rem',
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: '10px',
                color: 'white',
                outline: 'none',
                transition: 'all 0.25s ease',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)'
              }}
              onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.28)'}
              onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.18)'}
            />
          </div>

          <input
            onChange={registerInput}
            name="email"
            value={register.email}
            placeholder="Email"
            type="email"
            required
            style={{
              width: '100%',
              padding: '1rem 1.2rem',
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '10px',
              color: 'white',
              outline: 'none',
              transition: 'all 0.25s ease',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)'
            }}
            onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.28)'}
            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.18)'}
          />

          <input
            onChange={registerInput}
            name="password"
            value={register.password}
            placeholder="Password"
            type="password"
            required
            style={{
              width: '100%',
              padding: '1rem 1.2rem',
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '10px',
              color: 'white',
              outline: 'none',
              transition: 'all 0.25s ease',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)'
            }}
            onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.28)'}
            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.18)'}
          />

          <button
            type="submit"
            style={{
              padding: '1rem 0',
              fontSize: '1.25rem',
              fontWeight: '600',
              backgroundColor: isMouseover ? '#4491b3' : '#2c5f7a',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              marginTop: '1.5rem',
              transition: 'all 0.25s ease',
              boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
            }}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Register
          </button>
        </form>

        <p style={{
          marginTop: '2rem',
          fontSize: '1.1rem',
          opacity: 0.9
        }}>
          Already registered?{'  '}
          <span
            onClick={() => navigate('/login')}
            style={{
              color: '#a5d8ff',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Sign in
          </span>
        </p>
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        div { animation: fadeIn 0.8s ease-out; }
      `}</style>
    </div>
    </>
  );
}

export default Register;
