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
      const user = getUserLocalStorage();
      if (!user || !user.accessToken) {
         throw new Error("Token de acesso ausente ou inválido");
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`;
   }

   async getImageProfile(url: string) {
      try {
         this.authenticateRequests();
         const res = await api.get(url);
         return res.data;
      } catch (error) {
         console.error("Erro ao obter perfil:", error);
         throw error;
      }
   }

}

export const useUserService = () => new UserService()
