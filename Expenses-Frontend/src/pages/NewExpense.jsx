import { useState } from 'react';

export default function NewExpense({ setExpenses }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const [isMouseover, setIsMouseOver] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false); 

  function mouseOver() {
    setIsMouseOver(true);
  }

  function mouseOut() {
    setIsMouseOver(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !amount || !date) {
      alert('Please fill in all fields'); 
      return;
    }

    const newExpense = {
      id: Date.now() + Math.random(),
      title: title.trim(),
      amount: parseFloat(amount),
      date
    };

    setExpenses(prev => [...prev, newExpense]);

    // Reset form
    setTitle('');
    setAmount('');
    setDate('');

    // Show success toast
    setShowSuccessToast(true);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

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
      position: 'relative'
    }}>
      {/* Glass form container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '3.5rem 3rem',
        width: '100%',
        maxWidth: '520px',
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
          Add New Expense
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.6rem',
              fontSize: '1.1rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.9)'
            }}>
              Title / Description
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Groceries, Coffee, Train ticket"
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
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.6rem',
              fontSize: '1.1rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.9)'
            }}>
              Amount (£)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
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
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.6rem',
              fontSize: '1.1rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.9)'
            }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
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
          </div>

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
              marginTop: '2rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
            }}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Success Notification Toast */}
      {showSuccessToast && (
        <div style={{
          position: 'fixed',
          top: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(16, 185, 129, 0.95)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          fontSize: '1.1rem',
          fontWeight: '600',
          zIndex: 2000,
          animation: 'toastIn 0.4s ease-out, toastOut 0.4s 2.6s forwards'
        }}>
          Expense added successfully!
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translate(-50%, 0); }
          to   { opacity: 0; transform: translate(-50%, -20px); }
        }
        div { animation: fadeIn 0.8s ease-out; }
      `}</style>
    </div>
  );
}