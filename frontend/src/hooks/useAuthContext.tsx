import { useContext } from "react"
import { AuthContext } from "../context/auth/AuthContext"

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)
  return authContext
}

