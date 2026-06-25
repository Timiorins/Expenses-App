import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner({ size = 60, message = "Loading..." }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '1rem'
    }}>
      <CircularProgress size={size} thickness={4} color="inherit" />
      <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{message}</p>
    </div>
  );
}