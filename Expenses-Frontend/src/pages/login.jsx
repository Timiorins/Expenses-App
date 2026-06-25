import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [isMouseover, setIsMouseOver] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  function mouseOver() {
    setIsMouseOver(true);
  }

  function mouseOut() {
    setIsMouseOver(false);
  }

  function loginInput(e) {
    const { name, value } = e.target;
    setLogin((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function submitLogin(e) {
    e.preventDefault();

    if (!login.email || !login.password) {
    toast.error("Fill all empty fields", { position: "top-center" });
    return;
  }

    setError('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });
      const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    toast.success("Login successful!", { position: "top-center" });
    console.log('Login success - token:', data.token);
    authLogin(data.token);

    setLogin({
       email: "",
       password: "",
      });
      
      setError('')
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
      setError(err.message);
      } finally {
      setLoading(false);
    }
  }

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
      animation: 'fadeIn 1s ease-out'
    }}>
      {/* Form container – glass-like, centered */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.18)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          marginBottom: '2.5rem',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>
          Login
        </h1>

        <form onSubmit={submitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          <input
            className="loginInput" 
            onChange={loginInput}
            name="email"
            value={login.email}
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
            className="loginInput"
            onChange={loginInput}
            name="password"
            value={login.password}
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
            className="loginButton"
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem 0',
              fontSize: '1.25rem',
              fontWeight: '600',
              backgroundColor: isMouseover ? '#4491b3' : '#2c5f7a',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '1rem',
              transition: 'all 0.25s ease',
              boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            {loading && ' Logging in...'}
          </button>
        </form>

        <p style={{
          marginTop: '2rem',
          fontSize: '1.1rem',
          opacity: 0.9
        }}>
          Not registered? {'  '}
          <span
            onClick={() => navigate('/register')}
            style={{
              color: '#a5d8ff',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Sign up now
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

export default Login;
