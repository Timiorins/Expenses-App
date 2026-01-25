import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import AllExpenses from '../pages/AllExpenses'
import NewExpense from '../pages/NewExpense'
import ProtectedRoute from './ProtectedRoute'
import { useState } from 'react'


export default function App() {
  const [expenses, setExpenses] = useState([])

  return (
      <div style={{ minHeight: '100vh', backgroundColor: '#4491b3' }}>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {<Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Authenticated routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard expenses={expenses} />
              </ProtectedRoute>
            } />
            <Route path="/all-expenses" element={
              <ProtectedRoute>
                <Navbar />
                <AllExpenses expenses={expenses} setExpenses={setExpenses} />
              </ProtectedRoute>
            } />
            <Route path="/new-expense" element={
              <ProtectedRoute>
                <Navbar />
                <NewExpense setExpenses={setExpenses} />
              </ProtectedRoute>
            } />
          </Routes>}

          
          <Footer />
        </div>
      </div>
  )
}