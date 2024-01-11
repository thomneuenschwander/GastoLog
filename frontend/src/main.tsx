import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/Home.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage.tsx'
import Register from './pages/auth/Register.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth/register' element={<Register />} />
      </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
