import axios from "axios";
import { IRegister } from "../src/context/auth/types";

export const api = axios.create({
   baseURL: "http://localhost:8080",
});


// LOGIN
export const createSession = async (data: IRegister) => {
   return api.post("user/auth/login", data);
}
