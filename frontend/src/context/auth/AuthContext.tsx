import { createContext, useEffect, useState } from "react"
import { IContext, IAuthProvider, IUser, ICredentials, IRegister } from "./types"
import { createAccount, createSession, getUserLocalStorage, setUserLocalStorage } from "./user.service"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext<IContext | undefined>(undefined)

export const AuthProvider = ({ children }: IAuthProvider) => {
   const [user, setUser] = useState<IUser | null>()

   const navigate = useNavigate()

   useEffect(() => {
      const user = getUserLocalStorage()

      if (user) {
         setUser(user)
      }
   }, [])

   async function authenticate(credentials: ICredentials) {
      const res = await createSession(credentials)

      const payload = { token: res.data.accessToken, email: credentials.email }

      setUser(payload)
      setUserLocalStorage(payload)
      navigate('/home');
   }

   async function register(user: IRegister) {


      await createAccount(user)
      
      const toAuth: ICredentials = {
         email: user.email,
         password: user.password
      }

      await authenticate(toAuth)
   }
   
   function logout() {
      setUser(null)
      setUserLocalStorage(null)
      navigate('/');
   }

   return (
      <AuthContext.Provider value={{ ...user, authenticate, register, logout }}>
         {children}
      </AuthContext.Provider>
   )
}
