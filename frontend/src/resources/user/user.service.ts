import { IRegister, ICredentials, IUser } from "../../context/auth/types"
import { api } from "../api"

export function setUserLocalStorage(user: IUser | null) {
   localStorage.setItem("user", JSON.stringify(user))
}

export function getUserLocalStorage() {
   const json = localStorage.getItem("user")
   if (!json) {
      return null
   }
   const user = JSON.parse(json)

   return user ?? null
}

export async function createAccount(user: IRegister) {
   const res = await api.post("user/auth/register", user)
   return res.data
}

export const createSession = async (data: ICredentials) => {
   return api.post("user/auth/login", data)
}

class UserService {
   baseURL: string = "/user"
   static AUTH_PARAM: string = "_auth"

   authenticateRequests() {
      const user = getUserLocalStorage()
      const acessToken = user.token
      api.defaults.headers.common["Authorization"] = `Bearer ${acessToken}`
   }
   
   async getProfile() {
      this.authenticateRequests()
      const res = await api.get(this.baseURL + "/profile")
      return res.data
   }

}

export const useUserService = () => new UserService()
