import { useState } from "react"
import { Credentials } from "../resources/user/user.resource"

const useAuth = () => {
   const [credentials, setCredentials] = useState<Credentials>({
      email: "",
      password: "",
   })

   const handleCredentialsInputChange = (
      field: keyof Credentials,
      value: string
   ) => {
      setCredentials((prev) => ({ ...prev, [field]: value }))
   }

   return {
      ...credentials,
      handleCredentialsInputChange,
   }
}

export default useAuth
