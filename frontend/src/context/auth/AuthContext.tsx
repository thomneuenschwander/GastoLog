/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// TYPES
import {
   Credentials,
   RegisterData,
   UserSessionToken,
} from "../../resources/user/user.resource"
// SERVICES
import { useAuthService } from "../../resources/user/authentication.service"

export interface Context extends UserSessionToken {
   authenticate: (credential: Credentials) => Promise<void>
   register: (user: RegisterData) => Promise<void>
   logout: () => void
   isAuthenticate: boolean
}

export interface AuthProviderProps {
   children: JSX.Element
}
export const AuthContext = createContext<Context | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const [user, setUser] = useState<UserSessionToken | null>()
   const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false)

   const authService = useAuthService()

   const navigate = useNavigate()

   useEffect(() => {
      authService.isSessionValid()
         ? setIsAuthenticate(true)
         : setIsAuthenticate(false)
   }, [])

   useEffect(() => {
      if (isAuthenticate) {
         const userSessionToken = authService.getUserSession()
         setUser(userSessionToken)
      }
   }, [isAuthenticate])

   async function authenticate(credentials: Credentials) {
      const userSessionToken = await authService.initSession(credentials)
      setUser(userSessionToken)
      setIsAuthenticate(true)
      navigate("/home")
   }

   async function register(user: RegisterData) {
      await authService.save(user)
      const credentials: Credentials = {
         email: user.email,
         password: user.password,
      }
      await authenticate(credentials)
   }

   function logout() {
      setIsAuthenticate(false)
      setUser(null)
      authService.invalidateSession()
      navigate("/")
   }

   return (
      <AuthContext.Provider
         value={{ ...user, authenticate, register, logout, isAuthenticate }}
      >
         {children}
      </AuthContext.Provider>
   )
}
