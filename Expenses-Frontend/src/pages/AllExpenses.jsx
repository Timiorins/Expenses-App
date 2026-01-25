
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AllExpenses({ expenses, setExpenses }) {
  const [sortByAmount, setSortByAmount] = useState(null);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDeleteId, setExpenseToDeleteId] = useState(null);

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortByAmount === 'asc') return Number(a.amount) - Number(b.amount);
    if (sortByAmount === 'desc') return Number(b.amount) - Number(a.amount);
    return new Date(b.date) - new Date(a.date);
  });

  const openDeleteModal = (id) => {
    setExpenseToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (expenseToDeleteId !== null) {
      setExpenses(current => current.filter(exp => exp.id !== expenseToDeleteId));
    }
    setShowDeleteModal(false);
    setExpenseToDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setExpenseToDeleteId(null);
  };

  const toggleAmountSort = () => {
    if (!sortByAmount || sortByAmount === 'asc') setSortByAmount('desc');
    else setSortByAmount('asc');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4491b3 0%, #2c5f7a 100%)',
      color: 'white',
      padding: '6rem 1rem 4rem',
    }}>
      {/* Header section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '800',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
          textShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          All Expenses
        </h1>

        {sortedExpenses.length > 0 && (
          <button
            onClick={toggleAmountSort}
            style={{
              marginTop: '1.5rem',
              padding: '0.8rem 1.8rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              backgroundColor: sortByAmount ? '#1e3a5f' : 'rgba(255,255,255,0.18)',
              color: sortByAmount ? 'white' : 'white',
              border: sortByAmount ? 'none' : '1px solid rgba(255,255,255,0.35)',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }}
          >
            {sortByAmount === 'desc' ? 'Highest → Lowest' :
             sortByAmount === 'asc' ? 'Lowest → Highest' :
             'Sort by Amount'}
          </button>
        )}
      </div>

      {/* Expense list */}
      {sortedExpenses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '8rem 1rem',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.5rem',
          fontWeight: '500',
          opacity: 0.9
        }}>
          No expenses yet — add your first one!
        </div>
      ) : (
        <div style={{
          display: 'grid',
         
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {sortedExpenses.map(exp => (
            <div
              key={exp.id}
              style={{
                padding: '1.8rem',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: 'white'
                  }}>
                    {exp.title || 'Expense'}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    opacity: 0.8,
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {new Date(exp.date).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#ff9f43' // softer orange for amount
                  }}>
                    £{Number(exp.amount).toFixed(2)}
                  </div>

                  <button
                    onClick={() => openDeleteModal(exp.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.7)',
                      padding: '0.5rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b6b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    title="Delete expense"
                  >
                    <DeleteIcon style={{ fontSize: '2rem' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '2.5rem',
            width: '90%',
            maxWidth: '420px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            textAlign: 'center',
            color: '#1f2937'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}>
              Confirm Delete
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button
                onClick={cancelDelete}
                style={{
                  padding: '0.9rem 2rem',
                  background: '#e5e7eb',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#374151',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                style={{
                  padding: '0.9rem 2rem',
                  background: '#ef4444',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(239,68,68,0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}