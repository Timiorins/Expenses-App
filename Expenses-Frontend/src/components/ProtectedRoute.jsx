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

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // Temporary bypass for testing – comment this line out later
  return children;  // always show the page, ignore auth

  // Original code (uncomment when backend is ready)
  // return isAuthenticated ? children : <Navigate to="/login" replace />;
}