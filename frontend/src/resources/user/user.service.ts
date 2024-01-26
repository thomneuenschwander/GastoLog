import { api } from "../api"

export function getUserLocalStorage() {
   const json = localStorage.getItem("_auth")
   if (!json) {
      return null
   }
   const user = JSON.parse(json)

   return user ?? null
}

class UserService {
   baseURL: string = "/user"

   authenticateRequests() {
      const user = getUserLocalStorage()
      if (!user || !user.accessToken) {
         throw new Error("Invalid or null token")
      }
      api.defaults.headers.common[
         "Authorization"
      ] = `Bearer ${user.accessToken}`
   }

   async getImageProfile(url: string) {
      try {
         this.authenticateRequests()
         const res = await api.get(url)
         return res.data
      } catch (error) {
         console.error("Erro ao obter perfil:", error)
         throw error
      }
   }

   async postImage(file: File): Promise<void> {
      try {
         const user = getUserLocalStorage()
         if (!user || !user.accessToken) {
            throw new Error("Invalid or null token")
         }
         const formData = new FormData()
         formData.append("file", file)

         const res = await api.post("/user/image/add", formData, {
            headers: {
               Authorization: `Bearer ${user.accessToken}`,
               "Content-Type": "multipart/form-data", 
            },
         })

         console.log(res)
      } catch (error) {
         console.error(error)
      }
   }
}

export const useUserService = () => new UserService()
