import { ICredentials, IRegister } from "./types"

function validateName(name: string | undefined) {
   if (!name) {
      return "Preencha seu nome"
   } else {
      if (name?.length < 3) {
         return "O nome deve ter pelo menos 3 caracteres"
      } else if (!/[a-z]/.test(name)) {
         return "O nome deve conter letra minúscula"
      } else {
         for (let i = 0; i < name.length; i++) {
            const caracteresEspeciais = ["$", "#", "@", ")", "(", "!", "^", "&"]

            if (caracteresEspeciais.includes(name[i])) {
               return "O nome não pode conter caracteres especiais como $#@)(!^&"
            }
         }
      }
   }
}
function validateEmail(email: string | undefined) {
   if (!email) {
      return "Preencha seu email"
   } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
         return "Formato de email inválido"
      }
   }
}
function validatePassword(password: string | undefined) {
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
function validateAndConfirmPassword(
   password: string | undefined,
   confirmPassword: string | undefined
) {
   if (!confirmPassword) {
      return "Confirme sua senha"
   } else if (confirmPassword != password) {
      return "senhas nao sao iguais"
   } else {
      return validatePassword(password)
   }
}

export function registerValidation(user: IRegister) {
   const { name, email, password, confirmPassword } = user

   const nameError = validateName(name)
   const emailError = validateEmail(email)
   const passwordError = validateAndConfirmPassword(password, confirmPassword)

   if (nameError) {
      return nameError
   } else if (emailError) {
      return emailError
   } else if (passwordError) {
      return passwordError
   }

   return ""
}

export function loginValidation(credentials: ICredentials) {
   const { email, password } = credentials

   const emailError = validateEmail(email)
   const passwordError = validatePassword(password)

   if (emailError) {
      return emailError
   } else if (passwordError) {
      return passwordError
   }

   return ""
}
