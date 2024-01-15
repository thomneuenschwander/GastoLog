import axios from "axios"
// import { getUserLocalStorage } from "../src/context/auth/user.service"

export const api = axios.create({
   baseURL: "http://localhost:8080",
})



// api.interceptors.request.use(
//    (config) => {
      
//       const user = getUserLocalStorage()
//       console.log(config)
//       if (user?.token) {
//          config.headers.Authorization = user.token;
//       }
//       return config
//    },
//    (error) => {
//       return Promise.reject(error)
//    }
// )
