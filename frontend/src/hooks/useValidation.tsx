import { useState } from "react"
import { Credentials, RegisterData } from "../resources/user/user.resource"

const useValidation = () => {
   const [error, setError] = useState<string>("")

   const hasLowerCase = (str: string) => /[a-z]/.test(str)
   const hasSpecialsCharacters = (str: string) =>
      ["$", "#", "@", ")", "(", "!", "^", "&"].some((char) =>
         str.includes(char)
      )

   const defaultValidation = (validate: string | undefined, field: string) => {
      if (!validate) {
         return "Preencha seu " + field
      }
      if (!(validate.length < 25)) {
         return field + " precisa ser menor que " + 25
      }
      if (hasSpecialsCharacters(validate)) {
         return field + " nao é permitido caracteres especiais"
      }
   }

   const validateName = (name: string | undefined) => {
      const prev = defaultValidation(name, "name")
      if (prev) {
         return prev
      }
      if (!hasLowerCase(name!)) {
         return "O nome deve conter letra minúscula"
      }
      if (name!.length < 3) {
         return "O nome deve ter pelo menos 3 caracteres"
      }

      return ""
   }

   const validateEmail = (email: string | undefined) => {
      if (!email) {
         return "Preencha seu email"
      } else {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
         if (!emailRegex.test(email)) {
            return "Formato de email inválido"
         }
      }
   }

   const validatePassword = (password: string | undefined) => {
      if (!password) {
         return "Preencha sua senha"
      } else {
         if (password?.length < 3) {
            return "A senha deve ter pelo menos 3 caracteres"
         } else if (!/\d/.test(password)) {
            return "A senha deve conter pelo menos um número"
         }
      }
   }

   const validateAndConfirmPassword = (
      password: string | undefined,
      confirmPassword: string | undefined
   ) => {
      if (!confirmPassword) {
         return "Confirme sua senha"
      } else if (confirmPassword !== password) {
         return "Senhas não são iguais"
      } else {
         return validatePassword(password)
      }
   }

   const registerValidation = ({
      name,
      email,
      password,
      confirmPassword,
   }: RegisterData) => {
      const nameError = validateName(name)
      const emailError = validateEmail(email)
      const passwordError = validateAndConfirmPassword(
         password,
         confirmPassword
      )
      if (nameError) {
         setError(nameError)
      } else if (emailError) {
         setError(emailError)
      } else if (passwordError) {
         setError(passwordError)
      }

      return ""
   }

   const loginValidation = ({ email, password }: Credentials) => {
      const emailError = validateEmail(email)
      const passwordError = validatePassword(password)

      if (emailError) {
         setError(emailError)
      } else if (passwordError) {
         setError(passwordError)
      }
      return ""
   }

   return {
      error,
      registerValidation,
      loginValidation,
   }
}

export default useValidation
