import { createContext, useEffect, useState } from "react"
import { IContext, IAuthProvider, IUser, ICredentials, IRegister } from "./types"
import { createAccount, createSession, getUserLocalStorage, setUserLocalStorage } from "./user.service"

export const AuthContext = createContext<IContext | undefined>(undefined)

export const AuthProvider = ({ children }: IAuthProvider) => {
   const [user, setUser] = useState<IUser | null>()

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
   }

   async function register(user: IRegister) {


      await createAccount(user)
      
      const toAuth: ICredentials = {
         email: user.email,
         password: user.password
      }

      authenticate(toAuth)
   }
   
   function logout() {
      setUser(null)
      setUserLocalStorage(null)
   }

   return (
      <AuthContext.Provider value={{ ...user, authenticate, register, logout }}>
         {children}
      </AuthContext.Provider>
   )
}
