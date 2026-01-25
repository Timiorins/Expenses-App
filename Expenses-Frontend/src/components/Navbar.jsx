import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // adjust path if needed
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hide navbar completely on public pages

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: '#2c5f7a',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '80rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          {/* Logo */}
          <NavLink to="/dashboard"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.25rem',
              fontWeight: '700'
            }}>
            Expenses Tracker
          </NavLink>

          {/* Desktop links – hidden on mobile */}
          <div style={{ gap: '2rem' }} className="hidden md:flex">
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '0.5rem 1rem'
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/all-expenses"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '0.5rem 1rem'
              })}
            >
              All Expenses
            </NavLink>

            <NavLink
              to="/new-expense"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '0.5rem 1rem'
              })}
            >
              New Expense
            </NavLink>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              Logout
            </button>
          </div>

          {/* Hamburger icon – only on mobile */}
          <button
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4491b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          backgroundColor: '#2c5f7a',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          transition: 'transform 300ms ease-in-out',
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          overflow: 'hidden'
        }}
        className="md:hidden"
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #4491b3'
        }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4491b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <CloseIcon fontSize="large" />
          </button>
        </div>

        <div style={{
          padding: '1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              fontSize: '1.125rem',
              fontWeight: isActive ? '700' : '400',
              color: isActive ? 'white' : undefined,
            })}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/all-expenses"
            style={({ isActive }) => ({
              fontSize: '1.125rem',
              fontWeight: isActive ? '700' : '400',
              color: isActive ? 'white' : undefined,
            })}
            onClick={() => setIsOpen(false)}
          >
            All Expenses
          </NavLink>

          <NavLink
            to="/new-expense"
            style={({ isActive }) => ({
              fontSize: '1.125rem',
              fontWeight: isActive ? '700' : '400',
              color: isActive ? 'white' : undefined,
            })}
            onClick={() => setIsOpen(false)}
          >
            New Expense
          </NavLink>

          {/* Logout in mobile menu */}
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.125rem',
              cursor: 'pointer',
              textAlign: 'left',
              padding: '0.5rem 0'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}