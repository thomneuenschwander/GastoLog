import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// PAGES
import Home from './pages/home/Home.tsx'
import LandingPage from './pages/LandingPage/LandingPage.tsx'
import Register from './pages/auth/Register.tsx'
import Login from './pages/auth/Login.tsx'

//AUTH
import { AuthProvider } from './context/auth/AuthContext.tsx'
import Private from './context/auth/Private.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
    <AuthProvider>
      <Routes>
        <Route path='/home' element={<Private><Home /></Private>} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
