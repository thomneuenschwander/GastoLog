import { createContext, useEffect, useState } from "react"
import { IContext, IAuthProvider, IUser, ICredentials } from "./types"
import { getUserLocalStorage, setUserLocalStorage } from "./util"
import { createSession } from "../../../services/Api"

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
   
   function logout() {
      setUser(null)
      setUserLocalStorage(null)
   }

   return (
      <AuthContext.Provider value={{ ...user, authenticate, logout }}>
         {children}
      </AuthContext.Provider>
   )
}
