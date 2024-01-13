import { NavLink } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"
import { ICredentials } from "../../context/auth/types"

import Button from "../../components/Button"
import InputText from "../../components/input/InputText"
import Template from "../../components/templates/Template"
import HighLight from "../../components/Highlight"
import { useState } from "react"

const Login = () => {
   const [email, setEmail] = useState<string>("")
   const [password, setPassword] = useState<string>("")

   const auth = useAuth()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const toAuth: ICredentials = {
         email: email,
         password: password
      }

      try {
         await auth?.authenticate(toAuth)
      }catch(error){
         console.log(error)
      }
   }

   return (
      <Template>
         <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-5 max-w-2xl mx-auto mt-40 p-6 bg-white rounded-lg shadow-md mb-20">
               <h1 className="font-medium text-2xl text-primary">
                  Entrar na sua conta do <HighLight>GastoLog</HighLight>
               </h1>
               <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email:{" "}
                     </label>
                     <InputText
                        style="w-full"
                        placeholder="sua senha@gmail.com"
                        value={email}
                        onChange={setEmail}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium leading-6 text-gray-900">
                        Senha:{" "}
                     </label>
                     <InputText
                        style="w-full"
                        placeholder="senha"
                        value={password}
                        onChange={setPassword}
                     />
                  </div>
                  <Button style="w-full bg-primary" label="Registrar" />
               </form>
            </div>
            <NavLink to="/">
               <Button style="bg-gray-400" label="voltar" type="submit"/>
            </NavLink>
         </div>
      </Template>
   )
}

export default Login
