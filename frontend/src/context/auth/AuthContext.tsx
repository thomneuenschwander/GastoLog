import { createContext, useEffect, useState } from "react"
import { IContext, IAuthProvider } from "./types"
import { useNavigate } from "react-router-dom"
import {
   Credentials,
   RegisterData,
   UserSessionToken,
} from "../../resources/user/user.resource"
import { useAuthService } from "../../resources/user/authentication.service"

export const AuthContext = createContext<IContext | undefined>(undefined)

export const AuthProvider = ({ children }: IAuthProvider) => {
   const [user, setUser] = useState<UserSessionToken | null>()
   const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false)

   const authService = useAuthService()

   const navigate = useNavigate()

   useEffect(() => {
      authService.isSessionValid()
         ? setIsAuthenticate(true)
         : setIsAuthenticate(false)
   })

   async function authenticate(credentials: Credentials) {
      const userSessionToken = await authService.initSession(credentials)
      setUser(userSessionToken)
      setIsAuthenticate(true)
      navigate("/home")
   }

   async function register(userData: RegisterData) {
      await authService.save(userData)
      await authenticate(userData)
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
