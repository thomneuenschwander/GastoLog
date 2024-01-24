import { useState } from "react"
import { RegisterData } from "../resources/user/user.resource"

const useRegister = () => {
   const [register, setRegister] = useState<RegisterData>({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   })
   const handleRegisterInputChange = (
      field: keyof RegisterData,
      value: string
   ) => {
      setRegister((prev) => ({ ...prev, [field]: value }))
   }
   return {
      ...register,
      handleRegisterInputChange,
   }
}
export default useRegister
