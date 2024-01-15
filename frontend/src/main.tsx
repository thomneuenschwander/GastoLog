import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// PAGES
import Home from "./pages/home/Home.tsx"
import LandingPage from "./pages/LandingPage/LandingPage.tsx"
import Register from "./pages/auth/Register.tsx"
import Login from "./pages/auth/Login.tsx"

//CONTEXT

import { AuthProvider } from "./context/auth/AuthContext.tsx"

import Private from "./context/auth/Private.tsx"
import { ExpenseProvider } from "./context/expense/ExpenseContext.tsx"
import ExpensePage from "./pages/ExpensePage.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <BrowserRouter>
         <AuthProvider>
            <ExpenseProvider>
               <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth/register" element={<Register />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route
                     path="/home"
                     element={
                        <Private>
                           <Home />
                        </Private>
                     }
                  />
                  <Route path="/expense/:id" element={<ExpensePage />} />
               </Routes>
            </ExpenseProvider>
         </AuthProvider>
      </BrowserRouter>
   </React.StrictMode>
)
