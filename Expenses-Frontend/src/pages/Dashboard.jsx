import { useNavigate } from 'react-router-dom';

export default function Dashboard({ expenses }) {
  const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);


  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4491b3 0%, #2c5f7a 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 1rem 4rem',
    }}>
      {/* Hero Heading */}
      <h1 style={{
        fontSize: 'clamp(3rem, 7vw, 5rem)',
        fontWeight: '800',
        marginBottom: '1rem',
        letterSpacing: '-0.03em',
        textAlign: 'center',
        textShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        Welcome Back
      </h1>

      <p style={{
        fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
        fontWeight: '400',
        opacity: 0.9,
        marginBottom: '4rem',
        maxWidth: '700px',
        textAlign: 'center'
      }}>
        Here's a quick overview of your spending
      </p>

      {/* Stats Cards – grid layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        {/* Expenses Count Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.18)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
        }}>
          <p style={{
            fontSize: '1.3rem',
            opacity: 0.85,
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            Expenses Recorded
          </p>
          <p style={{
            fontSize: '5rem',
            fontWeight: '900',
            margin: 0,
            lineHeight: 1,
            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            {expenses.length}
          </p>
        </div>

        {/* Total Spent Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.18)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
        }}>
          <p style={{
            fontSize: '1.3rem',
            opacity: 0.85,
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            Total Spent
          </p>
          <p style={{
            fontSize: '5rem',
            fontWeight: '900',
            margin: 0,
            lineHeight: 1,
            color: '#f0f9ff',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            £{total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Call-to-action */}
      <p 
        onClick={() => navigate('/new-expense')}style={{
        marginTop: '4rem',
        fontSize: '1.3rem',
        cursor: 'pointer',
        opacity: 0.85,
        textAlign: 'center'
      }}>
        Ready to track more? Head to the <strong style={{ color: '#a5d8ff' }}>New Expense</strong> page.
      </p>
    </div>
  );
}