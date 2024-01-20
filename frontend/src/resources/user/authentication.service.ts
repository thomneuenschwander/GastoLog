import { jwtDecode } from "jwt-decode"
import { api } from "../api"
import {
   AccessToken,
   Credentials,
   RegisterData,
   UserSessionToken,
} from "./user.resource"

class AuthService {
   baseURL: string = "/user"
   static AUTH_PARAM: string = "_auth"

   async authenticate(credentials: Credentials): Promise<AccessToken> {
      const res = await api.post(this.baseURL + "/auth/login", credentials)
      return res.data
   }
   async save(user: RegisterData): Promise<void> {
      await api.post(this.baseURL + "/auth/register", user)
   }

   async initSession(credentials: Credentials): Promise<UserSessionToken> {
      const token = await this.authenticate(credentials)
      const session = this.decodeToken(token)
      this.setUserSession(session)
      return session
   }

   decodeToken(token: AccessToken): UserSessionToken {
      if (!token.accessToken) {
         throw new Error("Undefined token")
      }
      const decodedToken: any = jwtDecode(token.accessToken)
   
      const userSessionToken: UserSessionToken = {
         accessToken: token.accessToken,
         email: decodedToken.sub,
         expiration: decodedToken.exp,
      }
      return userSessionToken;
   }

   setUserSession(userSessionToken: UserSessionToken) {
      try {
         localStorage.setItem(
            AuthService.AUTH_PARAM,
            JSON.stringify(userSessionToken)
         )
      } catch (error) {
         /* empty */
      }
   }

   getUserSession(): UserSessionToken | null {
      try {
         const authString = localStorage.getItem(AuthService.AUTH_PARAM)
         if (!authString) {
            return null
         }

         const token: UserSessionToken = JSON.parse(authString)
         return token
      } catch (error) {
         return null
      }
   }

   isSessionValid(): boolean {
      const userSession: UserSessionToken | null = this.getUserSession()
      if (!userSession) {
         return false
      }

      const expiration: number | undefined = userSession.expiration
      if (expiration) {
         const expirationDateInMillis = expiration * 1000
         return new Date() < new Date(expirationDateInMillis)
      }

      return false
   }

   invalidateSession(): void {
      try {
         localStorage.removeItem(AuthService.AUTH_PARAM)
      } catch (error) {
         /* empty */
      }
   }
}
export const useAuthService = () => new AuthService()