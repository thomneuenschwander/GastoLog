import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/Home.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Home />} />
        
      </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
