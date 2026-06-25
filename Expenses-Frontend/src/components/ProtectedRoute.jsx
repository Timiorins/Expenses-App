// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }


import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';  // import your spinner

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // If auth is still checking → show spinner, do NOT redirect yet
  if (isLoading) {
    return <LoadingSpinner message="Verifying login..." />;
  }

  // Only now we know the real value — safe to decide
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → show the page
  return children;
}