import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'    
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext' 
import './index.css'
import ToastProvider from './components/ToastProvider';


createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BrowserRouter>
      <AuthProvider>           
        <App />
        <ToastProvider />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

